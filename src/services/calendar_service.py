import os
from datetime import datetime, timedelta
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from src.models.appointment import CalendarSettings, Appointment
from src.models.user import db

class CalendarService:
    """Service for managing Google Calendar integration"""
    
    SCOPES = ['https://www.googleapis.com/auth/calendar']
    
    def __init__(self, business_id):
        self.business_id = business_id
        self.settings = CalendarSettings.query.filter_by(business_id=business_id).first()
        
    def get_credentials(self):
        """Get valid Google Calendar credentials"""
        if not self.settings or not self.settings.google_calendar_enabled:
            return None
            
        if not self.settings.google_access_token:
            return None
            
        creds = Credentials(
            token=self.settings.google_access_token,
            refresh_token=self.settings.google_refresh_token,
            token_uri='https://oauth2.googleapis.com/token',
            client_id=os.getenv('GOOGLE_CLIENT_ID'),
            client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
            scopes=self.SCOPES
        )
        
        # Refresh token if expired
        if creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
                # Update stored tokens
                self.settings.google_access_token = creds.token
                self.settings.google_token_expiry = creds.expiry
                db.session.commit()
            except Exception as e:
                print(f"Error refreshing token: {e}")
                return None
                
        return creds
    
    def get_calendar_service(self):
        """Get Google Calendar API service"""
        creds = self.get_credentials()
        if not creds:
            return None
            
        try:
            service = build('calendar', 'v3', credentials=creds)
            return service
        except Exception as e:
            print(f"Error building calendar service: {e}")
            return None
    
    def check_availability(self, start_datetime, end_datetime):
        """Check if a time slot is available"""
        service = self.get_calendar_service()
        if not service:
            return False
            
        try:
            calendar_id = self.settings.google_calendar_id or 'primary'
            
            # Check for conflicts in Google Calendar
            events_result = service.events().list(
                calendarId=calendar_id,
                timeMin=start_datetime.isoformat() + 'Z',
                timeMax=end_datetime.isoformat() + 'Z',
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            events = events_result.get('items', [])
            
            # If there are any events in this time slot, it's not available
            if events:
                return False
                
            return True
            
        except HttpError as error:
            print(f"An error occurred checking availability: {error}")
            return False
    
    def get_available_slots(self, date, duration_minutes=60):
        """Get available time slots for a given date"""
        service = self.get_calendar_service()
        if not service:
            return []
            
        # Get business hours for the day
        day_name = date.strftime('%A').lower()
        business_hours = self.settings.business_hours or {}
        
        if day_name not in business_hours:
            return []
            
        hours = business_hours[day_name]
        if not hours or not hours.get('start') or not hours.get('end'):
            return []
            
        # Parse business hours
        start_time = datetime.strptime(hours['start'], '%H:%M').time()
        end_time = datetime.strptime(hours['end'], '%H:%M').time()
        
        # Create datetime objects for the day
        start_datetime = datetime.combine(date, start_time)
        end_datetime = datetime.combine(date, end_time)
        
        # Get existing events for the day
        try:
            calendar_id = self.settings.google_calendar_id or 'primary'
            events_result = service.events().list(
                calendarId=calendar_id,
                timeMin=start_datetime.isoformat() + 'Z',
                timeMax=end_datetime.isoformat() + 'Z',
                singleEvents=True,
                orderBy='startTime'
            ).execute()
            
            events = events_result.get('items', [])
            
        except HttpError as error:
            print(f"An error occurred: {error}")
            return []
        
        # Generate available slots
        available_slots = []
        current_time = start_datetime
        buffer_minutes = self.settings.buffer_time_minutes or 15
        
        while current_time + timedelta(minutes=duration_minutes) <= end_datetime:
            slot_end = current_time + timedelta(minutes=duration_minutes)
            
            # Check if this slot conflicts with any existing event
            is_available = True
            for event in events:
                event_start = datetime.fromisoformat(event['start'].get('dateTime', event['start'].get('date')).replace('Z', '+00:00'))
                event_end = datetime.fromisoformat(event['end'].get('dateTime', event['end'].get('date')).replace('Z', '+00:00'))
                
                # Check for overlap
                if (current_time < event_end and slot_end > event_start):
                    is_available = False
                    # Jump to after this event + buffer
                    current_time = event_end + timedelta(minutes=buffer_minutes)
                    break
            
            if is_available:
                available_slots.append({
                    'start': current_time.isoformat(),
                    'end': slot_end.isoformat(),
                    'display': current_time.strftime('%I:%M %p')
                })
                current_time += timedelta(minutes=duration_minutes + buffer_minutes)
        
        return available_slots
    
    def create_appointment(self, appointment_data):
        """Create an appointment in Google Calendar"""
        service = self.get_calendar_service()
        if not service:
            return None
            
        try:
            calendar_id = self.settings.google_calendar_id or 'primary'
            
            # Create event
            event = {
                'summary': f"Appointment: {appointment_data['customer_name']}",
                'description': appointment_data.get('notes', ''),
                'start': {
                    'dateTime': appointment_data['start_datetime'].isoformat(),
                    'timeZone': appointment_data.get('timezone', 'America/New_York'),
                },
                'end': {
                    'dateTime': appointment_data['end_datetime'].isoformat(),
                    'timeZone': appointment_data.get('timezone', 'America/New_York'),
                },
                'attendees': [],
                'reminders': {
                    'useDefault': False,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 30},
                    ],
                },
            }
            
            # Add customer email if provided
            if appointment_data.get('customer_email'):
                event['attendees'].append({'email': appointment_data['customer_email']})
            
            # Create the event
            event = service.events().insert(calendarId=calendar_id, body=event).execute()
            
            return event.get('id')
            
        except HttpError as error:
            print(f"An error occurred creating appointment: {error}")
            return None
    
    def update_appointment(self, event_id, appointment_data):
        """Update an appointment in Google Calendar"""
        service = self.get_calendar_service()
        if not service:
            return False
            
        try:
            calendar_id = self.settings.google_calendar_id or 'primary'
            
            # Get existing event
            event = service.events().get(calendarId=calendar_id, eventId=event_id).execute()
            
            # Update event
            event['summary'] = f"Appointment: {appointment_data['customer_name']}"
            event['description'] = appointment_data.get('notes', '')
            event['start'] = {
                'dateTime': appointment_data['start_datetime'].isoformat(),
                'timeZone': appointment_data.get('timezone', 'America/New_York'),
            }
            event['end'] = {
                'dateTime': appointment_data['end_datetime'].isoformat(),
                'timeZone': appointment_data.get('timezone', 'America/New_York'),
            }
            
            # Update the event
            updated_event = service.events().update(
                calendarId=calendar_id,
                eventId=event_id,
                body=event
            ).execute()
            
            return True
            
        except HttpError as error:
            print(f"An error occurred updating appointment: {error}")
            return False
    
    def cancel_appointment(self, event_id):
        """Cancel an appointment in Google Calendar"""
        service = self.get_calendar_service()
        if not service:
            return False
            
        try:
            calendar_id = self.settings.google_calendar_id or 'primary'
            service.events().delete(calendarId=calendar_id, eventId=event_id).execute()
            return True
            
        except HttpError as error:
            print(f"An error occurred canceling appointment: {error}")
            return False

