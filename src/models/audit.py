"""
Audit logging model for tracking data access and modifications
"""
from datetime import datetime
from src.models.user import db


class AuditLog(db.Model):
    """Audit log for tracking user actions"""
    __tablename__ = 'audit_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    action = db.Column(db.String(50), nullable=False)  # 'create', 'read', 'update', 'delete', 'login', 'logout'
    resource_type = db.Column(db.String(50), nullable=False)  # 'call', 'business', 'user', 'appointment'
    resource_id = db.Column(db.String(100), nullable=True)  # ID of the resource accessed
    ip_address = db.Column(db.String(45), nullable=True)  # IPv4 or IPv6
    user_agent = db.Column(db.String(255), nullable=True)  # Browser/client info
    details = db.Column(db.Text, nullable=True)  # Additional context (JSON string)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationship
    user = db.relationship('User', backref='audit_logs')
    
    def __repr__(self):
        return f'<AuditLog {self.action} on {self.resource_type} by user {self.user_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'action': self.action,
            'resource_type': self.resource_type,
            'resource_id': self.resource_id,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'details': self.details,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }


def log_action(user_id, action, resource_type, resource_id=None, ip_address=None, user_agent=None, details=None):
    """
    Helper function to create an audit log entry
    
    Args:
        user_id: ID of the user performing the action
        action: Type of action ('create', 'read', 'update', 'delete', 'login', 'logout')
        resource_type: Type of resource ('call', 'business', 'user', 'appointment')
        resource_id: ID of the specific resource
        ip_address: IP address of the request
        user_agent: User agent string from the request
        details: Additional details as a string or dict
    """
    try:
        if isinstance(details, dict):
            import json
            details = json.dumps(details)
        
        audit_entry = AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            ip_address=ip_address,
            user_agent=user_agent,
            details=details
        )
        db.session.add(audit_entry)
        db.session.commit()
    except Exception as e:
        print(f"Error creating audit log: {e}")
        db.session.rollback()

