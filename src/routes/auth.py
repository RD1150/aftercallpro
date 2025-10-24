from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import db, User
from src.models.call import Business
from functools import wraps

auth_bp = Blueprint('auth', __name__)

def login_required(f):
    """Decorator to require login for routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated_function

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user and create their business"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'password', 'name', 'phone_number']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 400
    
    # Check if phone number already exists
    existing_business = Business.query.filter_by(phone_number=data['phone_number']).first()
    if existing_business:
        return jsonify({'error': 'Phone number already registered'}), 400
    
    # Create new user
    user = User(
        username=data['email'],
        email=data['email']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.flush()  # Get user ID
    
    # Create business for the user
    business = Business(
        name=data['name'],
        phone_number=data['phone_number'],
        email=data['email'],
        business_hours_start=data.get('business_hours_start', '09:00'),
        business_hours_end=data.get('business_hours_end', '17:00'),
        timezone=data.get('timezone', 'America/New_York'),
        greeting_message=data.get('greeting_message', f'Thank you for calling {data["name"]}. Our AI assistant is here to help you 24/7.'),
        ai_voice=data.get('ai_voice', 'alloy'),
        subscription_tier=data.get('subscription_tier', 'starter'),
        monthly_minutes_limit=data.get('monthly_minutes_limit', 500)
    )
    
    db.session.add(business)
    db.session.commit()
    
    # Log the user in
    session['user_id'] = user.id
    session['business_id'] = business.id
    
    return jsonify({
        'message': 'Registration successful',
        'user': user.to_dict(),
        'business': business.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user"""
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Find user's business
    business = Business.query.filter_by(email=user.email).first()
    
    # Set session
    session['user_id'] = user.id
    if business:
        session['business_id'] = business.id
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'business': business.to_dict() if business else None
    }), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Logout user"""
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user():
    """Get current logged in user"""
    user = User.query.get(session['user_id'])
    business = Business.query.get(session.get('business_id'))
    
    return jsonify({
        'user': user.to_dict(),
        'business': business.to_dict() if business else None
    }), 200

@auth_bp.route('/check', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        business = Business.query.get(session.get('business_id'))
        return jsonify({
            'authenticated': True,
            'user': user.to_dict() if user else None,
            'business': business.to_dict() if business else None
        }), 200
    else:
        return jsonify({'authenticated': False}), 200

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Request password reset - generates token"""
    data = request.get_json()
    
    if not data.get('email'):
        return jsonify({'error': 'Email is required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    # Always return success to prevent email enumeration
    if not user:
        return jsonify({
            'message': 'If an account exists with this email, a reset link will be provided',
            'token': None
        }), 200
    
    # Generate reset token
    reset_token = user.generate_reset_token()
    db.session.commit()
    
    # In production, you would send this via email
    # For now, we'll return it in the response
    # TODO: Integrate email service (SendGrid, AWS SES, etc.)
    
    return jsonify({
        'message': 'Password reset token generated',
        'token': reset_token,
        'email': user.email,
        'expires_in': '1 hour'
    }), 200

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """Reset password using token"""
    data = request.get_json()
    
    required_fields = ['email', 'token', 'new_password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'error': 'Invalid reset request'}), 400
    
    # Verify token
    if not user.verify_reset_token(data['token']):
        return jsonify({'error': 'Invalid or expired reset token'}), 400
    
    # Validate new password
    if len(data['new_password']) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Set new password
    user.set_password(data['new_password'])
    user.clear_reset_token()
    db.session.commit()
    
    return jsonify({'message': 'Password reset successful'}), 200

@auth_bp.route('/verify-reset-token', methods=['POST'])
def verify_reset_token():
    """Verify if a reset token is valid"""
    data = request.get_json()
    
    if not data.get('email') or not data.get('token'):
        return jsonify({'error': 'Email and token required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'valid': False}), 200
    
    is_valid = user.verify_reset_token(data['token'])
    
    return jsonify({'valid': is_valid}), 200

