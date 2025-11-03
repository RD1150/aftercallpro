from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import secrets
import os

# Import encryption utilities (will be created)
try:
    from src.utils.encryption import encrypt_field, decrypt_field
except ImportError:
    # Fallback if encryption module not available
    def encrypt_field(value):
        return value
    def decrypt_field(value):
        return value

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    reset_token = db.Column(db.String(100), nullable=True)
    reset_token_expiry = db.Column(db.DateTime, nullable=True)
    
    # Role-based access control
    role = db.Column(db.String(20), nullable=False, default='user')  # 'admin', 'business_owner', 'staff', 'user'
    
    # Security enhancements
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)
    failed_login_attempts = db.Column(db.Integer, default=0)
    account_locked_until = db.Column(db.DateTime, nullable=True)
    two_factor_enabled = db.Column(db.Boolean, default=False)
    two_factor_secret = db.Column(db.String(32), nullable=True)
    
    # GDPR compliance
    data_processing_consent = db.Column(db.Boolean, default=False)
    marketing_consent = db.Column(db.Boolean, default=False)
    consent_date = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        """Hash and set the password"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the hash"""
        return check_password_hash(self.password_hash, password)

    def generate_reset_token(self):
        """Generate a secure reset token valid for 1 hour"""
        self.reset_token = secrets.token_urlsafe(32)
        self.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)
        return self.reset_token

    def verify_reset_token(self, token):
        """Verify if the reset token is valid and not expired"""
        if not self.reset_token or not self.reset_token_expiry:
            return False
        if self.reset_token != token:
            return False
        if datetime.utcnow() > self.reset_token_expiry:
            return False
        return True

    def clear_reset_token(self):
        """Clear the reset token after use"""
        self.reset_token = None
        self.reset_token_expiry = None

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'two_factor_enabled': self.two_factor_enabled
        }
    
    def has_role(self, role):
        """Check if user has a specific role"""
        return self.role == role
    
    def has_permission(self, permission):
        """Check if user has a specific permission based on role"""
        permissions = {
            'admin': ['all'],
            'business_owner': ['manage_business', 'view_calls', 'view_reports', 'manage_staff'],
            'staff': ['view_calls', 'manage_appointments'],
            'user': ['view_own_data']
        }
        user_permissions = permissions.get(self.role, [])
        return 'all' in user_permissions or permission in user_permissions
    
    def is_account_locked(self):
        """Check if account is currently locked"""
        if not self.account_locked_until:
            return False
        return datetime.utcnow() < self.account_locked_until
    
    def record_failed_login(self):
        """Record a failed login attempt and lock account if necessary"""
        self.failed_login_attempts += 1
        if self.failed_login_attempts >= 5:
            # Lock account for 30 minutes after 5 failed attempts
            self.account_locked_until = datetime.utcnow() + timedelta(minutes=30)
    
    def record_successful_login(self):
        """Record a successful login and reset failed attempts"""
        self.last_login = datetime.utcnow()
        self.failed_login_attempts = 0
        self.account_locked_until = None

