"""
Database Models for AfterCallPro
"""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from cryptography.fernet import Fernet
import os
import json

db = SQLAlchemy()

# Encryption helper
def get_cipher():
    """Get Fernet cipher for encryption"""
    key = os.getenv("ENCRYPTION_KEY")
    if key:
        return Fernet(key.encode())
    return None

class Conversation(db.Model):
    """Store conversation history"""
    __tablename__ = "conversations"
    
    id = db.Column(db.Integer, primary_key=True)
    call_sid = db.Column(db.String(100), unique=True, nullable=False, index=True)
    from_number = db.Column(db.String(20), nullable=False)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    ended_at = db.Column(db.DateTime)
    duration_seconds = db.Column(db.Integer)
    messages = db.Column(db.Text)  # JSON string of messages
    data_collected = db.Column(db.Text)  # JSON string of collected data
    status = db.Column(db.String(20), default="active")  # active, completed, failed
    
    def set_messages(self, messages_list):
        """Store messages as encrypted JSON"""
        cipher = get_cipher()
        json_str = json.dumps(messages_list)
        if cipher:
            self.messages = cipher.encrypt(json_str.encode()).decode()
        else:
            self.messages = json_str
    
    def get_messages(self):
        """Retrieve and decrypt messages"""
        if not self.messages:
            return []
        cipher = get_cipher()
        try:
            if cipher:
                decrypted = cipher.decrypt(self.messages.encode()).decode()
                return json.loads(decrypted)
            else:
                return json.loads(self.messages)
        except:
            return []
    
    def set_data_collected(self, data_dict):
        """Store collected data as encrypted JSON"""
        cipher = get_cipher()
        json_str = json.dumps(data_dict)
        if cipher:
            self.data_collected = cipher.encrypt(json_str.encode()).decode()
        else:
            self.data_collected = json_str
    
    def get_data_collected(self):
        """Retrieve and decrypt collected data"""
        if not self.data_collected:
            return {}
        cipher = get_cipher()
        try:
            if cipher:
                decrypted = cipher.decrypt(self.data_collected.encode()).decode()
                return json.loads(decrypted)
            else:
                return json.loads(self.data_collected)
        except:
            return {}

class Lead(db.Model):
    """Store captured leads"""
    __tablename__ = "leads"
    
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversations.id"))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default="new")  # new, contacted, converted, lost
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    conversation = db.relationship("Conversation", backref="leads")

class Appointment(db.Model):
    """Store booked appointments"""
    __tablename__ = "appointments"
    
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey("conversations.id"))
    lead_id = db.Column(db.Integer, db.ForeignKey("leads.id"))
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100))
    appointment_date = db.Column(db.DateTime, nullable=False)
    reason = db.Column(db.Text)
    status = db.Column(db.String(20), default="scheduled")  # scheduled, confirmed, completed, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    conversation = db.relationship("Conversation", backref="appointments")
    lead = db.relationship("Lead", backref="appointments")

class User(db.Model):
    """Store user accounts"""
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(200), nullable=False)
    company_name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    def __repr__(self):
        return f"<User {self.email}>"

