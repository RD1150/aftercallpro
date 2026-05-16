"""SmsService — single chokepoint for outbound SMS.

Every outbound text MUST go through `SmsService.send`. Calling
`twilio.Client.messages.create` directly bypasses the opt-out check, the rate
limiter, and the idempotency log — which is how you end up texting someone who
sent STOP, or double-billing on Twilio retries.
"""

import logging
import os
from datetime import datetime, timedelta

from src.models.user import db
from src.models.sms import SmsConsent, SmsSendLog

logger = logging.getLogger(__name__)


class SmsResult(dict):
    """Lightweight result wrapper so callers can both `result["sent"]` and unpack."""

    @property
    def sent(self) -> bool:
        return bool(self.get("sent"))


# Default per-business sends in a rolling window. Easy to override via env var.
DEFAULT_RATE_LIMIT = int(os.environ.get("SMS_RATE_LIMIT_PER_HOUR", "200"))
RATE_WINDOW = timedelta(hours=1)


class SmsService:
    @staticmethod
    def send(
        *,
        to: str,
        body: str,
        business=None,
        idempotency_key: str = None,
        from_number: str = None,
    ) -> SmsResult:
        """Send an SMS, gated on consent + rate limit + idempotency.

        Args:
            to: E.164 destination phone.
            body: Message body (caller is responsible for "Reply STOP to opt out" footer).
            business: Business model instance, or None for platform-level sends.
            idempotency_key: If provided and a prior send with the same
                (business_id, key) exists, return its result without re-sending.
            from_number: Override sender. Defaults to SMS_FROM_NUMBER (the
                verified toll-free number), then TWILIO_PHONE_NUMBER.

        Returns:
            SmsResult dict with `sent`, `reason`, `twilio_sid`, `log_id`.
        """
        business_id = getattr(business, "id", None) if business else None

        if idempotency_key:
            prior = SmsSendLog.query.filter_by(
                business_id=business_id, idempotency_key=idempotency_key
            ).first()
            if prior:
                return SmsResult(
                    sent=prior.status == "sent",
                    reason="idempotent_replay",
                    twilio_sid=prior.twilio_sid,
                    log_id=prior.id,
                )

        if SmsConsent.is_opted_out(phone=to, business_id=business_id):
            logger.info("SMS to %s blocked: opted out (business=%s)", to, business_id)
            return SmsResult(sent=False, reason="opted_out")

        if business_id is not None:
            since = datetime.utcnow() - RATE_WINDOW
            recent = (
                db.session.query(db.func.count(SmsSendLog.id))
                .filter(SmsSendLog.business_id == business_id, SmsSendLog.created_at >= since)
                .scalar()
            )
            if recent and recent >= DEFAULT_RATE_LIMIT:
                logger.warning(
                    "SMS rate limit hit for business %s: %s sends in last hour",
                    business_id,
                    recent,
                )
                return SmsResult(sent=False, reason="rate_limited")

        # SMS must go out from a number that is registered/verified for
        # messaging. business.twilio_number is the per-business LOCAL number —
        # it's provisioned for VOICE only and has no A2P 10DLC registration, so
        # sending SMS from it gets silently filtered by carriers (this is why
        # reminders never arrived). Outbound SMS goes from the verified
        # toll-free number instead. Recipients are identified by the message
        # body, not the sender number.
        sender = (
            from_number
            or os.environ.get("SMS_FROM_NUMBER")
            or os.environ.get("TWILIO_PHONE_NUMBER")
        )

        twilio_sid = None
        send_status = "sent"
        error_msg = None

        try:
            from twilio.rest import Client

            account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
            auth_token = os.environ.get("TWILIO_AUTH_TOKEN")

            if not all([account_sid, auth_token, sender]):
                logger.warning("Twilio not configured — SMS to %s not sent", to)
                send_status = "skipped"
                error_msg = "twilio_not_configured"
            else:
                client = Client(account_sid, auth_token)
                msg = client.messages.create(body=body, from_=sender, to=to)
                twilio_sid = msg.sid
                logger.info("SMS sent to %s from %s sid=%s", to, sender, twilio_sid)
        except Exception as e:
            logger.error("SMS send failed to %s: %s", to, e)
            send_status = "failed"
            error_msg = str(e)[:500]

        log = SmsSendLog(
            business_id=business_id,
            phone=to,
            idempotency_key=idempotency_key,
            twilio_sid=twilio_sid,
            status=send_status,
            error=error_msg,
        )
        db.session.add(log)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logger.error("Failed to log SMS send: %s", e)

        return SmsResult(
            sent=send_status == "sent",
            reason=send_status if send_status != "sent" else None,
            twilio_sid=twilio_sid,
            log_id=log.id,
        )
