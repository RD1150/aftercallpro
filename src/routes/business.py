from flask import Blueprint, request, jsonify
from src.models.call import db, Business, Call
from datetime import datetime

business_bp = Blueprint('business', __name__)

@business_bp.route('/businesses', methods=['GET'])
def get_businesses():
    """Get all businesses"""
    businesses = Business.query.all()
    return jsonify([business.to_dict() for business in businesses]), 200


@business_bp.route('/businesses/<int:business_id>', methods=['GET'])
def get_business(business_id):
    """Get a specific business"""
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    return jsonify(business.to_dict()), 200


@business_bp.route('/businesses', methods=['POST'])
def create_business():
    """Create a new business"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'phone_number', 'email']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if phone number already exists
    existing_business = Business.query.filter_by(phone_number=data['phone_number']).first()
    if existing_business:
        return jsonify({'error': 'Phone number already registered'}), 400
    
    # Create new business
    business = Business(
        name=data['name'],
        phone_number=data['phone_number'],
        email=data['email'],
        business_hours_start=data.get('business_hours_start', '09:00'),
        business_hours_end=data.get('business_hours_end', '17:00'),
        timezone=data.get('timezone', 'America/New_York'),
        greeting_message=data.get('greeting_message', 'Thank you for calling. How may I help you today?'),
        ai_voice=data.get('ai_voice', 'alloy'),
        subscription_tier=data.get('subscription_tier', 'starter'),
        monthly_minutes_limit=data.get('monthly_minutes_limit', 500)
    )
    
    db.session.add(business)
    db.session.commit()
    
    return jsonify(business.to_dict()), 201


@business_bp.route('/businesses/<int:business_id>', methods=['PUT'])
def update_business(business_id):
    """Update a business"""
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    data = request.get_json()
    
    # Update fields
    updatable_fields = [
        'name', 'email', 'business_hours_start', 'business_hours_end',
        'timezone', 'greeting_message', 'ai_voice', 'forward_urgent_calls',
        'forward_phone_number', 'subscription_tier', 'monthly_minutes_limit'
    ]
    
    for field in updatable_fields:
        if field in data:
            setattr(business, field, data[field])
    
    business.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify(business.to_dict()), 200


@business_bp.route('/businesses/<int:business_id>', methods=['DELETE'])
def delete_business(business_id):
    """Delete a business"""
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    db.session.delete(business)
    db.session.commit()
    
    return jsonify({'message': 'Business deleted successfully'}), 200


@business_bp.route('/businesses/<int:business_id>/calls', methods=['GET'])
def get_business_calls(business_id):
    """Get all calls for a specific business"""
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    # Get query parameters for filtering
    limit = request.args.get('limit', 50, type=int)
    offset = request.args.get('offset', 0, type=int)
    status = request.args.get('status')
    
    # Build query
    query = Call.query.filter_by(business_id=business_id)
    
    if status:
        query = query.filter_by(status=status)
    
    # Order by most recent first
    query = query.order_by(Call.started_at.desc())
    
    # Apply pagination
    calls = query.limit(limit).offset(offset).all()
    total_calls = query.count()
    
    return jsonify({
        'calls': [call.to_dict() for call in calls],
        'total': total_calls,
        'limit': limit,
        'offset': offset
    }), 200


@business_bp.route('/businesses/<int:business_id>/stats', methods=['GET'])
def get_business_stats(business_id):
    """Get statistics for a specific business"""
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    # Calculate statistics
    total_calls = Call.query.filter_by(business_id=business_id).count()
    completed_calls = Call.query.filter_by(business_id=business_id, status='completed').count()
    
    # Calculate average call duration
    calls = Call.query.filter_by(business_id=business_id, status='completed').all()
    avg_duration = sum(call.duration for call in calls) / len(calls) if calls else 0
    
    # Count appointments scheduled
    appointments_scheduled = Call.query.filter_by(
        business_id=business_id, 
        appointment_scheduled=True
    ).count()
    
    # Count forwarded calls
    forwarded_calls = Call.query.filter_by(
        business_id=business_id,
        forwarded_to_human=True
    ).count()
    
    return jsonify({
        'total_calls': total_calls,
        'completed_calls': completed_calls,
        'average_duration': round(avg_duration, 2),
        'appointments_scheduled': appointments_scheduled,
        'forwarded_calls': forwarded_calls,
        'minutes_used': business.minutes_used,
        'minutes_remaining': business.monthly_minutes_limit - business.minutes_used
    }), 200


@business_bp.route('/calls/<int:call_id>', methods=['GET'])
def get_call(call_id):
    """Get a specific call"""
    call = Call.query.get(call_id)
    if not call:
        return jsonify({'error': 'Call not found'}), 404
    return jsonify(call.to_dict()), 200

