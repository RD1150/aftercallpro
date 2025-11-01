from flask import Blueprint, request, jsonify, session
from datetime import datetime, timedelta
from src.models.appointment import Appointment, CalendarSettings
from src.models.call import Business
from src.services.calendar_service import CalendarService
from src.models.user import db
import os
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials

appointments_bp = Blueprint('appointments', __name__, url_prefix='/api/appointments')

# Google OAuth configuration
SCOPES = ['https://www.googleapis.com/auth/calendar']
REDIRECT_URI = os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:5000/api/appointments/oauth2callback')

@appointments_bp.route('/', methods=['GET'])
def get_appointments():
    """Get all appointments for the business"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    # Get query parameters
    status = request.args.get('status')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    # Build query
    query = Appointment.query.filter_by(business_id=business.id)
    
    if status:
        query = query.filter_by(status=status)
    
    if start_date:
        start_dt = datetime.fromisoformat(start_date)
        query = query.filter(Appointment.appointment_datetime >= start_dt)
    
    if end_date:
        end_dt = datetime.fromisoformat(end_date)
        query = query.filter(Appointment.appointment_datetime <= end_dt)
    
    appointments = query.order_by(Appointment.appointment_datetime.desc()).all()
    
    return jsonify({
        'appointments': [apt.to_dict() for apt in appointments]
    }), 200


@appointments_bp.route('/<int:appointment_id>', methods=['GET'])
def get_appointment(appointment_id):
    """Get a specific appointment"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    appointment = Appointment.query.filter_by(
        id=appointment_id,
        business_id=business.id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    return jsonify(appointment.to_dict()), 200


@appointments_bp.route('/', methods=['POST'])
def create_appointment():
    """Create a new appointment"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    data = request.json
    
    # Validate required fields
    required_fields = ['customer_name', 'customer_phone', 'appointment_datetime']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Parse datetime
    try:
        appointment_datetime = datetime.fromisoformat(data['appointment_datetime'])
    except ValueError:
        return jsonify({'error': 'Invalid datetime format'}), 400
    
    # Get duration
    duration_minutes = data.get('duration_minutes', 60)
    end_datetime = appointment_datetime + timedelta(minutes=duration_minutes)
    
    # Check availability if calendar is enabled
    calendar_service = CalendarService(business.id)
    if calendar_service.settings and calendar_service.settings.google_calendar_enabled:
        is_available = calendar_service.check_availability(appointment_datetime, end_datetime)
        if not is_available:
            return jsonify({'error': 'Time slot is not available'}), 409
    
    # Create appointment
    appointment = Appointment(
        business_id=business.id,
        customer_name=data['customer_name'],
        customer_phone=data['customer_phone'],
        customer_email=data.get('customer_email'),
        appointment_datetime=appointment_datetime,
        duration_minutes=duration_minutes,
        timezone=data.get('timezone', 'America/New_York'),
        appointment_type=data.get('appointment_type'),
        notes=data.get('notes'),
        status='scheduled'
    )
    
    db.session.add(appointment)
    db.session.flush()
    
    # Create in Google Calendar if enabled
    if calendar_service.settings and calendar_service.settings.google_calendar_enabled:
        appointment_data = {
            'customer_name': appointment.customer_name,
            'customer_email': appointment.customer_email,
            'start_datetime': appointment_datetime,
            'end_datetime': end_datetime,
            'timezone': appointment.timezone,
            'notes': appointment.notes
        }
        
        event_id = calendar_service.create_appointment(appointment_data)
        if event_id:
            appointment.google_calendar_event_id = event_id
    
    db.session.commit()
    
    return jsonify(appointment.to_dict()), 201


@appointments_bp.route('/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    """Update an appointment"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    appointment = Appointment.query.filter_by(
        id=appointment_id,
        business_id=business.id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    data = request.json
    
    # Update fields
    if 'customer_name' in data:
        appointment.customer_name = data['customer_name']
    if 'customer_phone' in data:
        appointment.customer_phone = data['customer_phone']
    if 'customer_email' in data:
        appointment.customer_email = data['customer_email']
    if 'appointment_datetime' in data:
        appointment.appointment_datetime = datetime.fromisoformat(data['appointment_datetime'])
    if 'duration_minutes' in data:
        appointment.duration_minutes = data['duration_minutes']
    if 'appointment_type' in data:
        appointment.appointment_type = data['appointment_type']
    if 'notes' in data:
        appointment.notes = data['notes']
    if 'status' in data:
        appointment.status = data['status']
    
    # Update in Google Calendar if enabled
    calendar_service = CalendarService(business.id)
    if appointment.google_calendar_event_id and calendar_service.settings and calendar_service.settings.google_calendar_enabled:
        end_datetime = appointment.appointment_datetime + timedelta(minutes=appointment.duration_minutes)
        appointment_data = {
            'customer_name': appointment.customer_name,
            'customer_email': appointment.customer_email,
            'start_datetime': appointment.appointment_datetime,
            'end_datetime': end_datetime,
            'timezone': appointment.timezone,
            'notes': appointment.notes
        }
        calendar_service.update_appointment(appointment.google_calendar_event_id, appointment_data)
    
    db.session.commit()
    
    return jsonify(appointment.to_dict()), 200


@appointments_bp.route('/<int:appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    """Delete/cancel an appointment"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    appointment = Appointment.query.filter_by(
        id=appointment_id,
        business_id=business.id
    ).first()
    
    if not appointment:
        return jsonify({'error': 'Appointment not found'}), 404
    
    # Cancel in Google Calendar if enabled
    calendar_service = CalendarService(business.id)
    if appointment.google_calendar_event_id and calendar_service.settings and calendar_service.settings.google_calendar_enabled:
        calendar_service.cancel_appointment(appointment.google_calendar_event_id)
    
    # Mark as cancelled instead of deleting
    appointment.status = 'cancelled'
    db.session.commit()
    
    return jsonify({'message': 'Appointment cancelled successfully'}), 200


@appointments_bp.route('/available-slots', methods=['GET'])
def get_available_slots():
    """Get available time slots for a date"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    date_str = request.args.get('date')
    if not date_str:
        return jsonify({'error': 'Date parameter is required'}), 400
    
    try:
        date = datetime.fromisoformat(date_str).date()
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400
    
    duration_minutes = int(request.args.get('duration', 60))
    
    calendar_service = CalendarService(business.id)
    if not calendar_service.settings or not calendar_service.settings.google_calendar_enabled:
        return jsonify({'error': 'Calendar integration not enabled'}), 400
    
    slots = calendar_service.get_available_slots(date, duration_minutes)
    
    return jsonify({'available_slots': slots}), 200


# Calendar Settings Endpoints

@appointments_bp.route('/calendar/settings', methods=['GET'])
def get_calendar_settings():
    """Get calendar settings for the business"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    settings = CalendarSettings.query.filter_by(business_id=business.id).first()
    
    if not settings:
        # Create default settings
        settings = CalendarSettings(
            business_id=business.id,
            default_appointment_duration=60,
            buffer_time_minutes=15,
            business_hours={
                'monday': {'start': '09:00', 'end': '17:00'},
                'tuesday': {'start': '09:00', 'end': '17:00'},
                'wednesday': {'start': '09:00', 'end': '17:00'},
                'thursday': {'start': '09:00', 'end': '17:00'},
                'friday': {'start': '09:00', 'end': '17:00'}
            },
            appointment_types=[
                {'name': 'Property Showing', 'duration': 60},
                {'name': 'Consultation', 'duration': 30},
                {'name': 'Open House', 'duration': 120}
            ]
        )
        db.session.add(settings)
        db.session.commit()
    
    return jsonify(settings.to_dict()), 200


@appointments_bp.route('/calendar/settings', methods=['PUT'])
def update_calendar_settings():
    """Update calendar settings"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    settings = CalendarSettings.query.filter_by(business_id=business.id).first()
    
    if not settings:
        settings = CalendarSettings(business_id=business.id)
        db.session.add(settings)
    
    data = request.json
    
    if 'default_appointment_duration' in data:
        settings.default_appointment_duration = data['default_appointment_duration']
    if 'buffer_time_minutes' in data:
        settings.buffer_time_minutes = data['buffer_time_minutes']
    if 'business_hours' in data:
        settings.business_hours = data['business_hours']
    if 'appointment_types' in data:
        settings.appointment_types = data['appointment_types']
    
    db.session.commit()
    
    return jsonify(settings.to_dict()), 200


@appointments_bp.route('/calendar/connect', methods=['GET'])
def connect_google_calendar():
    """Initiate Google Calendar OAuth flow"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    # Create OAuth flow
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": os.getenv('GOOGLE_CLIENT_ID'),
                "client_secret": os.getenv('GOOGLE_CLIENT_SECRET'),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI]
            }
        },
        scopes=SCOPES
    )
    
    flow.redirect_uri = REDIRECT_URI
    
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'
    )
    
    # Store state in session or database for verification
    # For now, we'll include business_id in the state
    authorization_url += f'&state={business.id}'
    
    return jsonify({'authorization_url': authorization_url}), 200


@appointments_bp.route('/calendar/oauth2callback', methods=['GET'])
def oauth2callback():
    """Handle Google Calendar OAuth callback"""
    code = request.args.get('code')
    state = request.args.get('state')
    
    if not code:
        return jsonify({'error': 'Authorization code not provided'}), 400
    
    try:
        business_id = int(state)
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid state parameter'}), 400
    
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    # Exchange code for tokens
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": os.getenv('GOOGLE_CLIENT_ID'),
                "client_secret": os.getenv('GOOGLE_CLIENT_SECRET'),
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [REDIRECT_URI]
            }
        },
        scopes=SCOPES
    )
    
    flow.redirect_uri = REDIRECT_URI
    flow.fetch_token(code=code)
    
    credentials = flow.credentials
    
    # Save credentials to database
    settings = CalendarSettings.query.filter_by(business_id=business_id).first()
    if not settings:
        settings = CalendarSettings(business_id=business_id)
        db.session.add(settings)
    
    settings.google_calendar_enabled = True
    settings.google_access_token = credentials.token
    settings.google_refresh_token = credentials.refresh_token
    settings.google_token_expiry = credentials.expiry
    settings.google_calendar_id = 'primary'
    
    db.session.commit()
    
    return jsonify({'message': 'Google Calendar connected successfully'}), 200


@appointments_bp.route('/calendar/disconnect', methods=['POST'])
def disconnect_google_calendar():
    """Disconnect Google Calendar"""
    if 'user_id' not in session:
        return jsonify({'error': 'Unauthorized'}), 401
    user_id = session['user_id']
    business = Business.query.filter_by(user_id=user_id).first()
    
    if not business:
        return jsonify({'error': 'Business not found'}), 404
    
    settings = CalendarSettings.query.filter_by(business_id=business.id).first()
    if settings:
        settings.google_calendar_enabled = False
        settings.google_access_token = None
        settings.google_refresh_token = None
        settings.google_token_expiry = None
        db.session.commit()
    
    return jsonify({'message': 'Google Calendar disconnected successfully'}), 200

