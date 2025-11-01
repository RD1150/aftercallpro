import os
import json
from datetime import datetime, timedelta
from openai import OpenAI
from src.models.appointment import Appointment, CalendarSettings
from src.services.calendar_service import CalendarService
from src.database import db

class AIService:
    """Service for AI-powered call handling with appointment booking"""
    
    def __init__(self, business, call):
        self.business = business
        self.call = call
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.calendar_service = CalendarService(business.id)
        
    def get_system_prompt(self):
        """Generate system prompt with appointment booking capability"""
        
        calendar_enabled = (
            self.calendar_service.settings and 
            self.calendar_service.settings.google_calendar_enabled
        )
        
        base_prompt = f"""You are an AI receptionist for {self.business.name}, a real estate business.
You are professional, friendly, and helpful. Keep responses brief and natural for phone conversations.

Your capabilities:
1. Answer questions about the business
2. Take detailed messages
3. Schedule appointments (property showings, consultations)
4. Route urgent matters to a human

Current date and time: {datetime.now().strftime('%A, %B %d, %Y at %I:%M %p')}
"""
        
        if calendar_enabled:
            # Add appointment booking instructions
            appointment_types = self.calendar_service.settings.appointment_types or [
                {'name': 'Property Showing', 'duration': 60},
                {'name': 'Consultation', 'duration': 30}
            ]
            
            types_str = ", ".join([f"{t['name']} ({t['duration']} min)" for t in appointment_types])
            
            base_prompt += f"""

APPOINTMENT BOOKING:
When a caller wants to schedule an appointment:
1. Ask for their preferred date and time
2. Confirm their name and contact information (phone and email)
3. Ask what type of appointment: {types_str}
4. Use the check_availability function to verify the time slot
5. If available, use the book_appointment function to schedule it
6. Confirm the appointment details with the caller

Always be helpful and flexible with scheduling."""
        else:
            base_prompt += """

APPOINTMENT REQUESTS:
If a caller wants to schedule an appointment:
1. Collect their name, phone number, email, and preferred date/time
2. Let them know you'll take their information and someone will call them back to confirm
3. Thank them for their interest"""
        
        return base_prompt
    
    def get_available_functions(self):
        """Get available functions for the AI"""
        
        calendar_enabled = (
            self.calendar_service.settings and 
            self.calendar_service.settings.google_calendar_enabled
        )
        
        if not calendar_enabled:
            return []
        
        return [
            {
                "type": "function",
                "function": {
                    "name": "check_availability",
                    "description": "Check if a specific date and time is available for an appointment",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "date": {
                                "type": "string",
                                "description": "The date in YYYY-MM-DD format"
                            },
                            "time": {
                                "type": "string",
                                "description": "The time in HH:MM format (24-hour)"
                            },
                            "duration_minutes": {
                                "type": "integer",
                                "description": "Duration of the appointment in minutes",
                                "default": 60
                            }
                        },
                        "required": ["date", "time"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "book_appointment",
                    "description": "Book an appointment for the caller",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "customer_name": {
                                "type": "string",
                                "description": "The caller's full name"
                            },
                            "customer_phone": {
                                "type": "string",
                                "description": "The caller's phone number"
                            },
                            "customer_email": {
                                "type": "string",
                                "description": "The caller's email address"
                            },
                            "date": {
                                "type": "string",
                                "description": "The date in YYYY-MM-DD format"
                            },
                            "time": {
                                "type": "string",
                                "description": "The time in HH:MM format (24-hour)"
                            },
                            "appointment_type": {
                                "type": "string",
                                "description": "Type of appointment (e.g., Property Showing, Consultation)"
                            },
                            "duration_minutes": {
                                "type": "integer",
                                "description": "Duration in minutes",
                                "default": 60
                            },
                            "notes": {
                                "type": "string",
                                "description": "Any additional notes about the appointment"
                            }
                        },
                        "required": ["customer_name", "customer_phone", "date", "time"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_available_slots",
                    "description": "Get available time slots for a specific date",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "date": {
                                "type": "string",
                                "description": "The date in YYYY-MM-DD format"
                            },
                            "duration_minutes": {
                                "type": "integer",
                                "description": "Duration needed in minutes",
                                "default": 60
                            }
                        },
                        "required": ["date"]
                    }
                }
            }
        ]
    
    def check_availability(self, date_str, time_str, duration_minutes=60):
        """Check if a time slot is available"""
        try:
            # Parse date and time
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            time_obj = datetime.strptime(time_str, '%H:%M').time()
            appointment_datetime = datetime.combine(date_obj, time_obj)
            end_datetime = appointment_datetime + timedelta(minutes=duration_minutes)
            
            # Check availability
            is_available = self.calendar_service.check_availability(
                appointment_datetime,
                end_datetime
            )
            
            return {
                "available": is_available,
                "message": f"{'Available' if is_available else 'Not available'} on {date_str} at {time_str}"
            }
        except Exception as e:
            return {
                "available": False,
                "message": f"Error checking availability: {str(e)}"
            }
    
    def get_available_slots(self, date_str, duration_minutes=60):
        """Get available slots for a date"""
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            slots = self.calendar_service.get_available_slots(date_obj, duration_minutes)
            
            if not slots:
                return {
                    "slots": [],
                    "message": f"No available slots on {date_str}"
                }
            
            return {
                "slots": slots,
                "message": f"Found {len(slots)} available slots on {date_str}"
            }
        except Exception as e:
            return {
                "slots": [],
                "message": f"Error getting available slots: {str(e)}"
            }
    
    def book_appointment(self, customer_name, customer_phone, date_str, time_str, 
                        customer_email=None, appointment_type=None, 
                        duration_minutes=60, notes=None):
        """Book an appointment"""
        try:
            # Parse date and time
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            time_obj = datetime.strptime(time_str, '%H:%M').time()
            appointment_datetime = datetime.combine(date_obj, time_obj)
            end_datetime = appointment_datetime + timedelta(minutes=duration_minutes)
            
            # Check availability first
            is_available = self.calendar_service.check_availability(
                appointment_datetime,
                end_datetime
            )
            
            if not is_available:
                return {
                    "success": False,
                    "message": f"Sorry, {date_str} at {time_str} is not available. Please choose another time."
                }
            
            # Create appointment
            appointment = Appointment(
                business_id=self.business.id,
                call_id=self.call.id,
                customer_name=customer_name,
                customer_phone=customer_phone,
                customer_email=customer_email,
                appointment_datetime=appointment_datetime,
                duration_minutes=duration_minutes,
                appointment_type=appointment_type,
                notes=notes,
                status='scheduled'
            )
            
            db.session.add(appointment)
            db.session.flush()
            
            # Create in Google Calendar
            appointment_data = {
                'customer_name': customer_name,
                'customer_email': customer_email,
                'start_datetime': appointment_datetime,
                'end_datetime': end_datetime,
                'timezone': 'America/New_York',
                'notes': notes
            }
            
            event_id = self.calendar_service.create_appointment(appointment_data)
            if event_id:
                appointment.google_calendar_event_id = event_id
            
            db.session.commit()
            
            # Mark that appointment was scheduled
            self.call.appointment_scheduled = True
            db.session.commit()
            
            return {
                "success": True,
                "appointment_id": appointment.id,
                "message": f"Great! I've scheduled your {appointment_type or 'appointment'} for {date_str} at {time_str}. You'll receive a confirmation shortly."
            }
            
        except Exception as e:
            db.session.rollback()
            return {
                "success": False,
                "message": f"Sorry, I encountered an error booking the appointment: {str(e)}"
            }
    
    def process_with_functions(self, user_message, conversation_history):
        """Process user message with function calling capability"""
        
        messages = [
            {"role": "system", "content": self.get_system_prompt()}
        ]
        
        # Add conversation history
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_message})
        
        tools = self.get_available_functions()
        
        try:
            # First API call
            response = self.client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=messages,
                tools=tools if tools else None,
                tool_choice="auto" if tools else None
            )
            
            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls
            
            # If no tool calls, return the response
            if not tool_calls:
                return response_message.content
            
            # Process tool calls
            messages.append(response_message)
            
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                
                # Execute the function
                if function_name == "check_availability":
                    function_response = self.check_availability(**function_args)
                elif function_name == "get_available_slots":
                    function_response = self.get_available_slots(**function_args)
                elif function_name == "book_appointment":
                    function_response = self.book_appointment(**function_args)
                else:
                    function_response = {"error": "Unknown function"}
                
                # Add function response to messages
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": function_name,
                    "content": json.dumps(function_response)
                })
            
            # Second API call to get final response
            second_response = self.client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=messages
            )
            
            return second_response.choices[0].message.content
            
        except Exception as e:
            print(f"Error in AI processing: {str(e)}")
            return "I apologize, but I'm having trouble processing your request right now. Let me take your information and someone will get back to you shortly."

