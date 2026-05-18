"""SMS consent + send-log tables.

`SmsConsent` is the source of truth for whether a phone number can receive SMS
from a given business. STOP/UNSUBSCRIBE inserts an opt_out row; START/UNSTOP
flips it back. A row with `business_id IS NULL` represents a global opt-out
across all businesses on the platform.

`SmsSendLog` records every outbound message. It backs two features:
  * **Idempotency** — if a caller passes an `idempotency_key`, we return the
    prior result instead of double-sending when Twilio retries on a 5xx.
  * **Rate limiting** — count rows for a business in a sliding window.
"""

from datetime import datetime
from src.models.user import db


OPT_IN = "opt_in"
OPT_OUT = "opt_out"


class SmsConsent(db.Model):
    __tablename__ = "sms_consents"

    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(20), nullable=False, index=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=True, index=True)
    status = db.Column(db.String(20), nullable=False, default=OPT_IN)
    consent_text = db.Column(db.Text, nullable=True)
    source = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    __table_args__ = (
        db.UniqueConstraint("phone", "business_id", name="uq_sms_consent_phone_business"),
    )

    @classmethod
    def is_opted_out(cls, phone: str, business_id: int) -> bool:
        """True if phone is opted out globally OR for this specific business."""
        rows = cls.query.filter(
            cls.phone == phone,
            db.or_(cls.business_id == business_id, cls.business_id.is_(None)),
        ).all()
        return any(r.status == OPT_OUT for r in rows)

    @classmethod
    def is_opted_in(cls, phone: str, business_id: int) -> bool:
        """True only if an explicit opt-in row exists for this phone (for this
        business or globally) AND it is not opted out. Used to gate messages to
        people who never signed a consent form — e.g. an inbound caller. An
        inbound call is NOT consent to text the caller back."""
        if cls.is_opted_out(phone=phone, business_id=business_id):
            return False
        rows = cls.query.filter(
            cls.phone == phone,
            db.or_(cls.business_id == business_id, cls.business_id.is_(None)),
        ).all()
        return any(r.status == OPT_IN for r in rows)

    @classmethod
    def record(cls, *, phone: str, business_id, status: str, consent_text: str = None, source: str = None):
        """Upsert a consent row for (phone, business_id)."""
        existing = cls.query.filter_by(phone=phone, business_id=business_id).first()
        if existing:
            existing.status = status
            if consent_text:
                existing.consent_text = consent_text
            if source:
                existing.source = source
            existing.updated_at = datetime.utcnow()
            return existing
        row = cls(
            phone=phone,
            business_id=business_id,
            status=status,
            consent_text=consent_text,
            source=source,
        )
        db.session.add(row)
        return row


class SmsSendLog(db.Model):
    __tablename__ = "sms_send_log"

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=True, index=True)
    phone = db.Column(db.String(20), nullable=False)
    idempotency_key = db.Column(db.String(100), nullable=True, index=True)
    twilio_sid = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(20), nullable=False, default="sent")
    error = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)

    __table_args__ = (
        db.UniqueConstraint("business_id", "idempotency_key", name="uq_sms_send_business_idem"),
    )
