"""
Security utilities and decorators for access control
"""
from functools import wraps
from flask import request, jsonify, session
from src.models.user import User
from src.models.audit import log_action


def require_auth(f):
    """Decorator to require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'error': 'Authentication required'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 401
        
        if user.is_account_locked():
            return jsonify({'error': 'Account is locked due to multiple failed login attempts'}), 403
        
        # Add user to request context
        request.current_user = user
        return f(*args, **kwargs)
    
    return decorated_function


def require_role(role):
    """Decorator to require a specific role"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            if not user_id:
                return jsonify({'error': 'Authentication required'}), 401
            
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 401
            
            if not user.has_role(role):
                log_action(
                    user_id=user.id,
                    action='unauthorized_access',
                    resource_type='endpoint',
                    resource_id=request.endpoint,
                    ip_address=request.remote_addr,
                    user_agent=request.headers.get('User-Agent'),
                    details=f'Required role: {role}, User role: {user.role}'
                )
                return jsonify({'error': f'Requires {role} role'}), 403
            
            request.current_user = user
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator


def require_permission(permission):
    """Decorator to require a specific permission"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            if not user_id:
                return jsonify({'error': 'Authentication required'}), 401
            
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 401
            
            if not user.has_permission(permission):
                log_action(
                    user_id=user.id,
                    action='unauthorized_access',
                    resource_type='endpoint',
                    resource_id=request.endpoint,
                    ip_address=request.remote_addr,
                    user_agent=request.headers.get('User-Agent'),
                    details=f'Required permission: {permission}'
                )
                return jsonify({'error': f'Requires {permission} permission'}), 403
            
            request.current_user = user
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator


def audit_action(action, resource_type):
    """Decorator to automatically log actions"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_id = session.get('user_id')
            resource_id = kwargs.get('id') or kwargs.get('business_id') or kwargs.get('call_id')
            
            # Execute the function
            result = f(*args, **kwargs)
            
            # Log the action
            if user_id:
                log_action(
                    user_id=user_id,
                    action=action,
                    resource_type=resource_type,
                    resource_id=str(resource_id) if resource_id else None,
                    ip_address=request.remote_addr,
                    user_agent=request.headers.get('User-Agent')
                )
            
            return result
        
        return decorated_function
    return decorator


def validate_password_strength(password):
    """
    Validate password strength
    Returns (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not any(c.isupper() for c in password):
        return False, "Password must contain at least one uppercase letter"
    
    if not any(c.islower() for c in password):
        return False, "Password must contain at least one lowercase letter"
    
    if not any(c.isdigit() for c in password):
        return False, "Password must contain at least one number"
    
    special_chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    if not any(c in special_chars for c in password):
        return False, "Password must contain at least one special character"
    
    return True, None


def sanitize_input(text, max_length=1000):
    """
    Sanitize user input to prevent XSS and injection attacks
    """
    if not text:
        return text
    
    # Remove any HTML tags
    import re
    text = re.sub(r'<[^>]+>', '', text)
    
    # Trim to max length
    if len(text) > max_length:
        text = text[:max_length]
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    return text


def get_client_ip():
    """Get the real client IP address, considering proxies"""
    if request.headers.get('X-Forwarded-For'):
        return request.headers.get('X-Forwarded-For').split(',')[0].strip()
    elif request.headers.get('X-Real-IP'):
        return request.headers.get('X-Real-IP')
    else:
        return request.remote_addr

