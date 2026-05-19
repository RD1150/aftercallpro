from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db
from src.utils.encryption import EncryptedText

class Business(db.Model):
    """Business model for multi-tenancy support"""
    __tablename__ = 'businesses'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    
    # Business settings
    business_hours_start = db.Column(db.String(10), default="09:00")
    business_hours_end = db.Column(db.String(10), default="17:00")
    timezone = db.Column(db.String(50), default="America/New_York")
    
    # AI Configuration
    greeting_message = db.Column(db.Text, default="Thank you for calling. How may I help you today?")
    ai_voice = db.Column(db.String(50), default="alloy")
    industry = db.Column(db.String(100), nullable=True)  # e.g. "real estate", "plumbing", "law firm"
    principal_name = db.Column(db.String(100), nullable=True)  # the human the AI works for (e.g. "Reena")
    assistant_name = db.Column(db.String(100), nullable=True)  # the AI's name (e.g. "Sarah")
    # Average value of a closed job — owner-set, drives the ROI revenue estimate.
    avg_job_value = db.Column(db.Integer, nullable=True)
    # Public Google review URL — owner-set; drives the post-appointment
    # review-request SMS. No review requests go out until this is set.
    review_link = db.Column(db.String(500), nullable=True)
    forward_urgent_calls = db.Column(db.Boolean, default=False)
    forward_phone_number = db.Column(db.String(20), nullable=True)
    
    # Subscription
    subscription_tier = db.Column(db.String(50), default="starter")
    monthly_minutes_limit = db.Column(db.Integer, default=500)
    minutes_used = db.Column(db.Integer, default=0)
    subscription_status = db.Column(db.String(50), default="active")
    
    # Stripe
    stripe_customer_id = db.Column(db.String(100), nullable=True)
    stripe_subscription_id = db.Column(db.String(100), nullable=True)

    # Founding member: signed up via /signup?plan=founding. At checkout we
    # apply a 60-day trial and a forever-50%-off coupon.
    founding_member = db.Column(db.Boolean, default=False, nullable=False)

    # Twilio — dedicated number assigned to this business (ISV compliance)
    # Each business must have their own unique number per Twilio ISV requirements.
    twilio_number = db.Column(db.String(20), nullable=True, unique=True)
    twilio_number_sid = db.Column(db.String(100), nullable=True)
    twilio_number_provisioned = db.Column(db.Boolean, default=False)

    # SMS template — customizable per business
    sms_template = db.Column(
        db.Text,
        default="Hi, this is {business_name} — sorry we missed your call. How can we help?"
    )

    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    calls = db.relationship('Call', backref='business', lazy=True, cascade='all, delete-orphan')

    def get_sms_from_number(self):
        """Return the business's dedicated Twilio number, or None if not yet provisioned."""
        return self.twilio_number if self.twilio_number_provisioned else None

    def format_sms_body(self, template: str = None) -> str:
        """Format the SMS body using the business's template or a provided override."""
        t = template or self.sms_template or "Hi, this is {business_name} — sorry we missed your call. How can we help?"
        return t.replace("{business_name}", self.name)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone_number': self.phone_number,
            'email': self.email,
            'business_hours_start': self.business_hours_start,
            'business_hours_end': self.business_hours_end,
            'timezone': self.timezone,
            'greeting_message': self.greeting_message,
            'ai_voice': self.ai_voice,
            'industry': self.industry,
            'principal_name': self.principal_name,
            'assistant_name': self.assistant_name,
            'twilio_number': self.twilio_number,
            'twilio_number_provisioned': self.twilio_number_provisioned,
            'sms_template': self.sms_template,
            'subscription_tier': self.subscription_tier,
            'monthly_minutes_limit': self.monthly_minutes_limit,
            'minutes_used': self.minutes_used,
            'founding_member': self.founding_member,
            'avg_job_value': self.avg_job_value,
            'review_link': self.review_link,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Call(db.Model):
    """Call model to store call history and details"""
    __tablename__ = 'calls'
    
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    
    # Call details
    call_sid = db.Column(db.String(100), unique=True, nullable=False)
    from_number = db.Column(db.String(20), nullable=False)
    to_number = db.Column(db.String(20), nullable=False)
    
    # Call status
    status = db.Column(db.String(50), default="initiated")  # initiated, in-progress, completed, failed
    duration = db.Column(db.Integer, default=0)  # in seconds
    
    # Conversation data — transcript holds caller speech and may contain PII.
    transcript = db.Column(EncryptedText, nullable=True)
    summary = db.Column(db.Text, nullable=True)
    sentiment = db.Column(db.String(50), nullable=True)  # positive, neutral, negative
    
    # Call outcome
    appointment_scheduled = db.Column(db.Boolean, default=False)
    forwarded_to_human = db.Column(db.Boolean, default=False)
    caller_intent = db.Column(db.String(200), nullable=True)

    # Subscriber-facing follow-up state. Lives on the call (no separate
    # contacts table) — see aftercallpro_no_crm memory for the no-CRM stance.
    handled_status = db.Column(db.String(20), default='new', nullable=False)
    handled_at = db.Column(db.DateTime, nullable=True)

    # Timestamps
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'call_sid': self.call_sid,
            'from_number': self.from_number,
            'to_number': self.to_number,
            'status': self.status,
            'duration': self.duration,
            'transcript': self.transcript,
            'summary': self.summary,
            'sentiment': self.sentiment,
            'appointment_scheduled': self.appointment_scheduled,
            'forwarded_to_human': self.forwarded_to_human,
            'caller_intent': self.caller_intent,
            'handled_status': self.handled_status,
            'handled_at': self.handled_at.isoformat() if self.handled_at else None,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'ended_at': self.ended_at.isoformat() if self.ended_at else None
        }

