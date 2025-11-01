from datetime import datetime
from src.database import db

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False)
    call_id = db.Column(db.Integer, db.ForeignKey('calls.id'), nullable=True)
    
    # Appointment details
    customer_name = db.Column(db.String(200), nullable=False)
    customer_phone = db.Column(db.String(20), nullable=False)
    customer_email = db.Column(db.String(200), nullable=True)
    
    # Scheduling
    appointment_datetime = db.Column(db.DateTime, nullable=False)
    duration_minutes = db.Column(db.Integer, default=60)
    timezone = db.Column(db.String(50), default='America/New_York')
    
    # Type and notes
    appointment_type = db.Column(db.String(100), nullable=True)  # e.g., "Property Showing", "Consultation"
    notes = db.Column(db.Text, nullable=True)
    
    # Status
    status = db.Column(db.String(20), default='scheduled')  # scheduled, confirmed, cancelled, completed, no_show
    
    # Calendar integration
    google_calendar_event_id = db.Column(db.String(200), nullable=True)
    
    # Confirmation
    confirmation_sent = db.Column(db.Boolean, default=False)
    confirmation_sent_at = db.Column(db.DateTime, nullable=True)
    reminder_sent = db.Column(db.Boolean, default=False)
    reminder_sent_at = db.Column(db.DateTime, nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    business = db.relationship('Business', backref='appointments')
    call = db.relationship('Call', backref='appointment', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'call_id': self.call_id,
            'customer_name': self.customer_name,
            'customer_phone': self.customer_phone,
            'customer_email': self.customer_email,
            'appointment_datetime': self.appointment_datetime.isoformat() if self.appointment_datetime else None,
            'duration_minutes': self.duration_minutes,
            'timezone': self.timezone,
            'appointment_type': self.appointment_type,
            'notes': self.notes,
            'status': self.status,
            'google_calendar_event_id': self.google_calendar_event_id,
            'confirmation_sent': self.confirmation_sent,
            'reminder_sent': self.reminder_sent,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class CalendarSettings(db.Model):
    __tablename__ = 'calendar_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=False, unique=True)
    
    # Google Calendar OAuth
    google_calendar_enabled = db.Column(db.Boolean, default=False)
    google_access_token = db.Column(db.Text, nullable=True)
    google_refresh_token = db.Column(db.Text, nullable=True)
    google_token_expiry = db.Column(db.DateTime, nullable=True)
    google_calendar_id = db.Column(db.String(200), nullable=True)  # primary calendar ID
    
    # Availability settings
    default_appointment_duration = db.Column(db.Integer, default=60)  # minutes
    buffer_time_minutes = db.Column(db.Integer, default=15)  # buffer between appointments
    
    # Business hours (JSON format: {"monday": {"start": "09:00", "end": "17:00"}, ...})
    business_hours = db.Column(db.JSON, nullable=True)
    
    # Appointment types (JSON format: [{"name": "Property Showing", "duration": 60}, ...])
    appointment_types = db.Column(db.JSON, nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    business = db.relationship('Business', backref='calendar_settings', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'google_calendar_enabled': self.google_calendar_enabled,
            'google_calendar_id': self.google_calendar_id,
            'default_appointment_duration': self.default_appointment_duration,
            'buffer_time_minutes': self.buffer_time_minutes,
            'business_hours': self.business_hours,
            'appointment_types': self.appointment_types,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

