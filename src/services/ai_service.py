import os
import json
import traceback
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from openai import OpenAI
from src.models.appointment import Appointment, CalendarSettings
from src.services.calendar_service import CalendarService
from src.models.user import db

class AIService:
    """Service for AI-powered call handling with appointment booking"""
    
    def __init__(self, business, call):
        self.business = business
        self.call = call
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.calendar_service = CalendarService(business.id)
        # Set True by the transfer_to_human tool when the AI judges the call
        # urgent — voice.py checks it and emits <Dial> TwiML to bridge the
        # caller to the owner.
        self.transfer_requested = False

    def get_system_prompt(self):
        """Generate system prompt with appointment booking capability"""
        
        calendar_enabled = (
            self.calendar_service.settings and 
            self.calendar_service.settings.google_calendar_enabled
        )
        
        industry = (getattr(self.business, "industry", None) or "").strip()
        principal = (getattr(self.business, "principal_name", None) or "").strip()
        assistant = (getattr(self.business, "assistant_name", None) or "").strip()

        # Identity sentence — favor the principal's name when set, fall back to the business.
        if principal and assistant:
            identity = f"You are {assistant}, {principal}'s AI assistant"
            self_ref = f"{principal}'s AI assistant"
        elif principal:
            identity = f"You are {principal}'s AI assistant"
            self_ref = f"{principal}'s AI assistant"
        elif assistant:
            identity = f"You are {assistant}, the AI assistant for {self.business.name}"
            self_ref = f"the AI assistant for {self.business.name}"
        else:
            identity = f"You are an AI receptionist for {self.business.name}"
            self_ref = f"the AI assistant for {self.business.name}"

        industry_clause = f", a {industry} professional" if (industry and principal) else (
            f", a {industry} business" if industry else ""
        )

        base_prompt = f"""{identity}{industry_clause}. Warm, friendly, upbeat. Keep replies short and natural for phone.

Rules:
- One question per reply. Never stack questions.
- Identify yourself as "{self_ref}" whenever you reference your role.
- Briefly acknowledge what the caller said before your next question.
- Only ask "Is there anything else I can help you with?" once the caller's main need has been handled.
- Never re-ask for the caller's name — or any other detail — once they have given it. Re-asking is the single most common complaint.

The call has already opened with a greeting — do NOT greet the caller again. Your VERY FIRST reply must ask for the caller's name and nothing else: "Thanks for calling! Can I get your name?" Do NOT ask "how can I help you" before you have their name. If the caller opens with their request, briefly acknowledge it ("Sure, I can help with that —") but still ask their name before going further. Once they give it, use it naturally and never ask for it again.

Capabilities: answer questions, take messages, schedule appointments, route urgent matters.

FOLLOW-UP CONTACT — near the end of the call, once the caller's need has been handled, secure ONE way to reach them back:
1. Ask exactly once: "Is it okay if we send you a quick follow-up text?" If the caller clearly says yes, call the record_sms_consent function. If they decline, hesitate, or are unclear, do NOT call it — never assume consent.
2. If (and only if) the caller said NO to the text, ask for their email as the fallback contact: "No problem — what's the best email to reach you at?" Let them say it, then read it back once to confirm and accept one correction. Then move on — email over the phone is error-prone, so do NOT keep re-asking; we still have their phone number as a backup, so an imperfect email is fine to record.

Now: {datetime.now(ZoneInfo(self.business.timezone or 'America/Los_Angeles')).strftime('%a %b %d %Y, %I:%M %p %Z')}
"""
        
        if calendar_enabled:
            # Add appointment booking instructions
            appointment_types = self.calendar_service.settings.appointment_types or [
                {'name': 'Appointment', 'duration': 60},
                {'name': 'Consultation', 'duration': 30}
            ]

            # Open houses are handled via take-a-message, not booking — never offer them as a bookable type.
            bookable_types = [t for t in appointment_types if 'open house' not in t['name'].lower()]
            types_str = ", ".join([f"{t['name']} ({t['duration']} min)" for t in bookable_types])
            
            base_prompt += f"""

APPOINTMENT BOOKING:
When a caller wants to schedule an appointment:
1. Ask for their preferred date and time
2. Confirm their name and phone number. Email is optional — only take it if the caller offers it; never ask them to spell out an email, phone-line speech recognition mangles it.
3. Ask what type of appointment: {types_str}
4. Use the check_availability function to verify the time slot
5. If available, use the book_appointment function to schedule it
6. Confirm the appointment details with the caller

OPEN HOUSES — DO NOT BOOK:
If the caller asks to attend an open house, walkthrough, or any pre-scheduled group event, do NOT use book_appointment and do NOT call check_availability. You cannot confirm whether an open house exists. Instead, take a message:
1. "Which property's open house are you asking about?"
2. "What date and time were you planning to come?"
3. "Can I get your name and a callback number?"
4. Then say: "I'll have [agent name] reach out to confirm the details." Do not promise the open house is happening.

Always be helpful and flexible with scheduling."""
        else:
            base_prompt += """

Taking a message — strict one-field-per-turn sequence:
1. "Can I get your name?" (skip this step if the caller has already given their name) (wait)
2. "And what's the best phone number to reach you?" (wait)
3. Briefly read back the name and phone number so the caller can correct them.
4. Thank them; say someone will call back to confirm.

During message-taking, capture name and phone number only — do NOT ask for email here. Email is handled at the very end of the call (see FOLLOW-UP CONTACT) and only if the caller declines a follow-up text. Never ask a caller to spell out an email letter by letter — phone-line speech recognition mangles spelled-out letters; have them say it normally and read it back instead.

Never ask for the same piece of information more than twice. If speech recognition clearly garbled an answer, work with what you have and move on — repeating the question is the fastest way to lose the caller."""

        if self.business.forward_urgent_calls and self.business.forward_phone_number:
            base_prompt += """

URGENT CALLS: If the caller describes a genuine emergency or an urgent problem that truly cannot wait for a callback, call the transfer_to_human function to connect them to a real person right now. Use it ONLY for real urgency — never for routine questions or scheduling. Briefly reassure the caller first ("Let me connect you with someone right away")."""

        return base_prompt
    
    def get_available_functions(self):
        """Get available functions for the AI"""

        calendar_enabled = (
            self.calendar_service.settings and
            self.calendar_service.settings.google_calendar_enabled
        )

        # Always available, regardless of calendar setup: record the caller's
        # spoken SMS opt-in so we're allowed to send the follow-up text.
        functions = [
            {
                "type": "function",
                "function": {
                    "name": "record_sms_consent",
                    "description": (
                        "Record that the caller agreed to receive a follow-up "
                        "text message. Call this ONLY after the caller has "
                        "clearly said yes to being texted. Takes no arguments."
                    ),
                    "parameters": {"type": "object", "properties": {}},
                },
            },
        ]

        # Urgent live-transfer — only offered when the business has set a
        # forwarding number to receive transferred emergency calls.
        if self.business.forward_urgent_calls and self.business.forward_phone_number:
            functions.append({
                "type": "function",
                "function": {
                    "name": "transfer_to_human",
                    "description": (
                        "Connect the caller to a real person immediately. Call "
                        "this ONLY when the caller has a genuine emergency or "
                        "urgent situation that cannot wait for a callback."
                    ),
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "reason": {
                                "type": "string",
                                "description": "Brief reason the call is urgent",
                            },
                        },
                    },
                },
            })

        if not calendar_enabled:
            return functions

        functions.extend([
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
                                "description": "Type of appointment (e.g., Consultation, Service Appointment)"
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
        ])
        return functions

    def record_sms_consent(self):
        """Record an SMS opt-in for the caller after they verbally agreed on
        the call to receive a follow-up text. Without this opt-in the
        follow-up SMS is suppressed — an inbound call alone is not consent."""
        from src.models.sms import SmsConsent, OPT_IN
        from src.models.user import db
        try:
            phone = (self.call.from_number or "").strip()
            if not phone:
                return {"recorded": False, "message": "No caller number on file."}
            SmsConsent.record(
                phone=phone,
                business_id=self.business.id,
                status=OPT_IN,
                source="in_call_voice_consent",
                consent_text=(
                    "Caller verbally agreed during a phone call with "
                    f"{self.business.name}'s AI assistant to receive a "
                    "follow-up text message. Reply STOP to opt out."
                ),
            )
            db.session.commit()
            return {"recorded": True, "message": "Follow-up text consent recorded."}
        except Exception as e:
            return {"recorded": False, "message": f"Could not record consent: {e}"}

    def transfer_to_human(self, reason=None):
        """Flag this call for an immediate live transfer to a human. voice.py
        checks self.transfer_requested after process_with_functions and emits
        the <Dial> TwiML that bridges the caller to the forwarding number."""
        self.transfer_requested = True
        self.transfer_reason = (reason or "").strip()
        return {
            "status": "transferring",
            "message": "Connecting the caller to a team member now.",
        }

    def check_availability(self, date, time, duration_minutes=60):
        """Check if a time slot is available"""
        try:
            tz = ZoneInfo(self.business.timezone or 'America/Los_Angeles')
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            time_obj = datetime.strptime(time, '%H:%M').time()
            appointment_datetime = datetime.combine(date_obj, time_obj, tzinfo=tz)
            end_datetime = appointment_datetime + timedelta(minutes=duration_minutes)

            is_available = self.calendar_service.check_availability(
                appointment_datetime,
                end_datetime
            )

            return {
                "available": is_available,
                "message": f"{'Available' if is_available else 'Not available'} on {date} at {time}"
            }
        except Exception as e:
            return {
                "available": False,
                "message": f"Error checking availability: {str(e)}"
            }
    
    def get_available_slots(self, date, duration_minutes=60):
        """Get available slots for a date"""
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            slots = self.calendar_service.get_available_slots(date_obj, duration_minutes)

            if not slots:
                return {
                    "slots": [],
                    "message": f"No available slots on {date}"
                }

            return {
                "slots": slots,
                "message": f"Found {len(slots)} available slots on {date}"
            }
        except Exception as e:
            return {
                "slots": [],
                "message": f"Error getting available slots: {str(e)}"
            }
    
    def book_appointment(self, customer_name, customer_phone, date, time,
                        customer_email=None, appointment_type=None,
                        duration_minutes=60, notes=None):
        """Book an appointment"""
        # Open houses are pre-scheduled group events we can't verify exist from
        # the agent's calendar alone — refuse to book and route to a message.
        if appointment_type and 'open house' in appointment_type.lower():
            return {
                "success": False,
                "message": "I can't confirm open house details over this line. Let me take your name, callback number, and which property you're asking about, and I'll have someone call you back to confirm."
            }
        try:
            business_tz = self.business.timezone or 'America/Los_Angeles'
            tz = ZoneInfo(business_tz)
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            time_obj = datetime.strptime(time, '%H:%M').time()
            appointment_datetime = datetime.combine(date_obj, time_obj, tzinfo=tz)
            end_datetime = appointment_datetime + timedelta(minutes=duration_minutes)

            is_available = self.calendar_service.check_availability(
                appointment_datetime,
                end_datetime
            )

            if not is_available:
                return {
                    "success": False,
                    "message": f"Sorry, {date} at {time} is not available. Please choose another time."
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
            
            appointment.timezone = business_tz

            appointment_data = {
                'customer_name': customer_name,
                'customer_email': customer_email,
                'start_datetime': appointment_datetime,
                'end_datetime': end_datetime,
                'timezone': business_tz,
                'notes': notes
            }
            
            event_id = self.calendar_service.create_appointment(appointment_data)
            if event_id:
                appointment.google_calendar_event_id = event_id
            
            db.session.commit()

            # Mark that appointment was scheduled
            self.call.appointment_scheduled = True
            db.session.commit()

            # Text the customer a confirmation. Transactional — they booked
            # this appointment on the call and gave their number for it — so
            # it isn't gated on a separate SMS opt-in.
            try:
                from src.services.sms_service import SmsService
                appt_str = appointment_datetime.strftime('%A, %B %-d at %-I:%M %p')
                result = SmsService.send(
                    to=customer_phone,
                    body=(
                        f"Hi {customer_name}, your {appointment_type or 'appointment'} "
                        f"with {self.business.name} is confirmed for {appt_str}. "
                        f"Need to change it? Just call us back."
                    ),
                    business_id=self.business.id,
                    idempotency_key=f"appt_confirm:{appointment.id}",
                )
                if getattr(result, "sent", False):
                    appointment.confirmation_sent = True
                    appointment.confirmation_sent_at = datetime.utcnow()
                    db.session.commit()
            except Exception as e:
                print(f"Appointment confirmation SMS failed: {e}")

            return {
                "success": True,
                "appointment_id": appointment.id,
                "message": f"Great! I've scheduled your {appointment_type or 'appointment'} for {date} at {time}. You'll get a text confirmation shortly."
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
            # First API call. Tool calls need headroom for their JSON args —
            # 80 tokens truncates the function arguments and json.loads then
            # raises, surfacing as a generic "having trouble" reply.
            response = self.client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=messages,
                tools=tools if tools else None,
                tool_choice="auto" if tools else None,
                max_tokens=300 if tools else 80,
                temperature=0.7,
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
                elif function_name == "record_sms_consent":
                    function_response = self.record_sms_consent()
                elif function_name == "transfer_to_human":
                    function_response = self.transfer_to_human(**function_args)
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
                messages=messages,
                max_tokens=80,
                temperature=0.7,
            )
            
            return second_response.choices[0].message.content
            
        except Exception as e:
            print(f"Error in AI processing: {type(e).__name__}: {str(e)}")
            print(traceback.format_exc())
            return "I apologize, but I'm having trouble processing your request right now. Let me take your information and someone will get back to you shortly."


def summarize_call(call):
    """Post-call: distil the transcript into summary / caller_intent /
    sentiment so the lead shows useful info in the dashboard instead of blank
    fields. Mutates `call` but does not commit — the caller commits. Best-
    effort: any failure leaves the fields null rather than breaking the
    Twilio status callback."""
    transcript = (call.transcript or "").strip()
    if not transcript:
        return

    try:
        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": (
                    "You analyze a phone call transcript between an AI receptionist "
                    "and a caller. Reply ONLY with a JSON object with exactly these keys: "
                    '"summary" (1-2 sentences: why they called and the outcome), '
                    '"caller_intent" (a short phrase, max 6 words, e.g. "book cleaning appointment"), '
                    '"sentiment" (one of: positive, neutral, negative).'
                )},
                {"role": "user", "content": transcript[:6000]},
            ],
            max_tokens=200,
            temperature=0.2,
            response_format={"type": "json_object"},
        )
        data = json.loads(response.choices[0].message.content)

        call.summary = (data.get("summary") or "").strip() or None
        call.caller_intent = ((data.get("caller_intent") or "").strip() or None)
        if call.caller_intent:
            call.caller_intent = call.caller_intent[:200]
        sentiment = (data.get("sentiment") or "").strip().lower()
        call.sentiment = sentiment if sentiment in ("positive", "neutral", "negative") else None
    except Exception as e:
        print(f"Call summarization failed: {type(e).__name__}: {str(e)}")

