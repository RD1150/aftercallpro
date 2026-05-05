from flask import Blueprint, request, jsonify, session
from src.models.call import db, Business
from datetime import datetime

settings_bp = Blueprint('settings', __name__)


@settings_bp.route('/business/settings', methods=['GET'])
def get_business_settings():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    business = Business.query.filter_by(user_id=user_id).first()
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    return jsonify({
        'id': business.id,
        'name': business.name,
        'business_name': business.name,
        'phone_number': business.phone_number,
        'email': business.email,
        'timezone': getattr(business, 'timezone', None),
        'ai_greeting': getattr(business, 'greeting_message', None) or getattr(business, 'ai_greeting', None),
        'ai_voice': getattr(business, 'ai_voice', 'nova'),
        'after_hours_greeting': getattr(business, 'after_hours_greeting', None),
        'after_hours_enabled': getattr(business, 'after_hours_enabled', False),
        'language': getattr(business, 'language', 'en-US'),
        'sms_template': getattr(business, 'sms_template', None),
        'subscription_tier': getattr(business, 'subscription_tier', 'starter'),
        'subscription_status': getattr(business, 'subscription_status', 'active'),
        'minutes_used': getattr(business, 'minutes_used', 0),
        'monthly_minutes_limit': getattr(business, 'monthly_minutes_limit', 1500),
    }), 200


@settings_bp.route('/business/settings', methods=['POST', 'PUT'])
def update_business_settings():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    business = Business.query.filter_by(user_id=user_id).first()
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    data = request.get_json() or {}

    # Map frontend fields to model fields
    field_map = {
        'ai_greeting': 'greeting_message',
        'ai_voice': 'ai_voice',
        'after_hours_greeting': 'after_hours_greeting',
        'after_hours_enabled': 'after_hours_enabled',
        'language': 'language',
        'sms_template': 'sms_template',
        'name': 'name',
        'business_name': 'name',
        'phone_number': 'phone_number',
        'timezone': 'timezone',
    }

    for frontend_key, model_key in field_map.items():
        if frontend_key in data:
            if hasattr(business, model_key):
                setattr(business, model_key, data[frontend_key])

    if hasattr(business, 'updated_at'):
        business.updated_at = datetime.utcnow()

    db.session.commit()

    return jsonify({'message': 'Settings saved successfully'}), 200


@settings_bp.route('/business/onboarding', methods=['POST'])
def complete_onboarding():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json() or {}

    business = Business.query.filter_by(user_id=user_id).first()

    if not business:
        # Create new business
        business = Business(
            user_id=user_id,
            name=data.get('business_name', 'My Business'),
            phone_number=data.get('phone_number', ''),
            email='',
        )
        db.session.add(business)

    # Update all onboarding fields
    if data.get('business_name'):
        business.name = data['business_name']
    if data.get('phone_number'):
        business.phone_number = data['phone_number']
    if data.get('website') and hasattr(business, 'website'):
        business.website = data['website']
    if data.get('address') and hasattr(business, 'address'):
        business.address = data['address']
    if data.get('business_type') and hasattr(business, 'business_type'):
        business.business_type = data['business_type']
    if data.get('ai_greeting') and hasattr(business, 'greeting_message'):
        business.greeting_message = data['ai_greeting']
    if data.get('ai_voice') and hasattr(business, 'ai_voice'):
        business.ai_voice = data['ai_voice']
    if data.get('sms_template') and hasattr(business, 'sms_template'):
        business.sms_template = data['sms_template']
    if hasattr(business, 'onboarding_completed'):
        business.onboarding_completed = True
    if hasattr(business, 'updated_at'):
        business.updated_at = datetime.utcnow()

    db.session.commit()

    return jsonify({'message': 'Onboarding complete', 'business_id': business.id}), 200


@settings_bp.route('/appointments/<int:appt_id>/send-reminder', methods=['POST'])
def send_appointment_reminder(appt_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        from src.models.appointment import Appointment
        appt = Appointment.query.get(appt_id)
        if not appt:
            return jsonify({'error': 'Appointment not found'}), 404

        business = Business.query.filter_by(user_id=user_id).first()
        if not business or appt.business_id != business.id:
            return jsonify({'error': 'Unauthorized'}), 403

        # Send SMS reminder via Twilio
        import os
        from twilio.rest import Client
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        from_number = os.getenv('TWILIO_PHONE_NUMBER')

        if not all([account_sid, auth_token, from_number]):
            return jsonify({'error': 'Twilio not configured'}), 500

        client = Client(account_sid, auth_token)

        appt_time = appt.appointment_datetime.strftime('%A, %B %d at %I:%M %p') if appt.appointment_datetime else 'your upcoming appointment'
        msg_body = (
            f"Hi {appt.customer_name}, this is a reminder from {business.name}. "
            f"Your appointment is scheduled for {appt_time}. "
            f"Reply CONFIRM to confirm or CANCEL to cancel. Reply STOP to opt out."
        )

        message = client.messages.create(
            body=msg_body,
            from_=from_number,
            to=appt.customer_phone,
        )

        return jsonify({'message': 'Reminder sent', 'sid': message.sid}), 200

    except ImportError:
        return jsonify({'error': 'Appointment model not available'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@settings_bp.route('/voice/test-greeting', methods=['POST'])
def test_greeting():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.get_json() or {}
    text = data.get('text', 'Hello, this is a test of your AfterCallPro AI greeting.')
    voice = data.get('voice', 'nova')

    try:
        import os
        from twilio.rest import Client
        from src.models.user import User

        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        from_number = os.getenv('TWILIO_PHONE_NUMBER')

        user = User.query.get(user_id)
        if not user or not user.phone:
            return jsonify({'error': 'No phone number on file to call'}), 400

        if not all([account_sid, auth_token, from_number]):
            return jsonify({'error': 'Twilio not configured'}), 500

        client = Client(account_sid, auth_token)

        twiml = f'<Response><Say voice="{voice}">{text}</Say></Response>'
        call = client.calls.create(
            twiml=twiml,
            to=user.phone,
            from_=from_number,
        )

        return jsonify({'message': 'Test call initiated', 'sid': call.sid}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
