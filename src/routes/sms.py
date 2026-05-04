"""SMS routes — Twilio incoming webhook + public opt-in form endpoint."""

import logging

from flask import Blueprint, request, jsonify, Response
from twilio.twiml.messaging_response import MessagingResponse

from src.models.call import Business
from src.models.sms import SmsConsent, OPT_IN, OPT_OUT
from src.models.user import db
from src.utils.twilio_security import twilio_webhook

logger = logging.getLogger(__name__)

sms_bp = Blueprint("sms", __name__)


STOP_KEYWORDS = {"STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"}
START_KEYWORDS = {"START", "UNSTOP", "YES"}
HELP_KEYWORDS = {"HELP", "INFO"}


def _business_for_to_number(to_number: str):
    if not to_number:
        return None
    return Business.query.filter_by(twilio_number=to_number).first()


@sms_bp.route("/incoming", methods=["POST"])
@twilio_webhook
def incoming_sms():
    """Twilio inbound SMS webhook. Handles STOP / HELP / START.

    For non-keyword messages we just acknowledge — actual conversational handling
    can layer in later.
    """
    from_number = (request.form.get("From") or "").strip()
    to_number = (request.form.get("To") or "").strip()
    body = (request.form.get("Body") or "").strip()

    business = _business_for_to_number(to_number)
    business_id = business.id if business else None

    upper = body.upper().strip(" .!?")

    twiml = MessagingResponse()

    if upper in STOP_KEYWORDS:
        SmsConsent.record(
            phone=from_number,
            business_id=business_id,
            status=OPT_OUT,
            source="sms_stop",
        )
        db.session.commit()
        biz_name = business.name if business else "AfterCallPro"
        twiml.message(f"You have been unsubscribed from {biz_name}. No further messages will be sent. Reply START to resubscribe.")
    elif upper in START_KEYWORDS:
        SmsConsent.record(
            phone=from_number,
            business_id=business_id,
            status=OPT_IN,
            source="sms_start",
        )
        db.session.commit()
        biz_name = business.name if business else "AfterCallPro"
        twiml.message(f"You're resubscribed to {biz_name}. Reply STOP to opt out.")
    elif upper in HELP_KEYWORDS:
        biz_name = business.name if business else "AfterCallPro"
        twiml.message(f"{biz_name}: Reply STOP to unsubscribe. Msg & data rates may apply. Support: support@aftercallpro.com")
    else:
        logger.info("Inbound SMS from %s to %s (business=%s) — passing through", from_number, to_number, business_id)

    return Response(str(twiml), mimetype="application/xml")


@sms_bp.route("/opt-in", methods=["POST"])
def opt_in():
    """Public opt-in endpoint. Records consent for a phone number.

    Required JSON: phone, consent_text, source.
    Optional: business_id (defaults to a global opt-in if omitted).
    """
    data = request.get_json(silent=True) or request.form.to_dict() or {}
    phone = (data.get("phone") or "").strip()
    consent_text = (data.get("consent_text") or "").strip()
    source = (data.get("source") or "").strip()
    business_id = data.get("business_id")

    missing = [k for k, v in {"phone": phone, "consent_text": consent_text, "source": source}.items() if not v]
    if missing:
        return jsonify({"error": f"Missing required fields: {', '.join(missing)}"}), 400

    business = None
    if business_id:
        try:
            business_id = int(business_id)
        except (TypeError, ValueError):
            return jsonify({"error": "business_id must be an integer"}), 400
        business = Business.query.get(business_id)
        if not business:
            return jsonify({"error": "business not found"}), 404

    SmsConsent.record(
        phone=phone,
        business_id=business.id if business else None,
        status=OPT_IN,
        consent_text=consent_text,
        source=source,
    )
    db.session.commit()

    return jsonify({"ok": True}), 201
