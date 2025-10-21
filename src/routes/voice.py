from flask import Blueprint, request, Response, jsonify
from twilio.twiml.voice_response import VoiceResponse, Gather
from src.models.call import db, Call, Business
from src.services.email_service import email_service
from datetime import datetime
import os

voice_bp = Blueprint('voice', __name__)

@voice_bp.route('/incoming', methods=['POST'])
def handle_incoming_call():
    """Handle incoming calls from Twilio"""
    
    # Get call details from Twilio
    from_number = request.form.get('From')
    to_number = request.form.get('To')
    call_sid = request.form.get('CallSid')
    
    # Find the business by phone number
    business = Business.query.filter_by(phone_number=to_number).first()
    
    if not business:
        # No business found for this number
        response = VoiceResponse()
        response.say("We're sorry, but this number is not configured. Please contact support.")
        response.hangup()
        return str(response)
    
    # Create a new call record
    call = Call(
        business_id=business.id,
        call_sid=call_sid,
        from_number=from_number,
        to_number=to_number,
        status='in-progress',
        started_at=datetime.utcnow()
    )
    db.session.add(call)
    db.session.commit()
    
    # Create TwiML response
    response = VoiceResponse()
    
    # Greet the caller
    response.say(business.greeting_message, voice=business.ai_voice)
    
    # Gather user input
    gather = Gather(
        input='speech',
        action=f'/api/voice/process?call_id={call.id}',
        method='POST',
        timeout=5,
        speech_timeout='auto'
    )
    gather.say("Please tell me how I can help you today.", voice=business.ai_voice)
    response.append(gather)
    
    # If no input, redirect
    response.redirect('/api/voice/no-input')
    
    return str(response)


@voice_bp.route('/process', methods=['POST'])
def process_speech():
    """Process the caller's speech input"""
    
    call_id = request.args.get('call_id')
    speech_result = request.form.get('SpeechResult', '')
    
    if not call_id:
        response = VoiceResponse()
        response.say("An error occurred. Please try again.")
        response.hangup()
        return str(response)
    
    call = Call.query.get(call_id)
    if not call:
        response = VoiceResponse()
        response.say("An error occurred. Please try again.")
        response.hangup()
        return str(response)
    
    # Update call transcript
    if call.transcript:
        call.transcript += f"\nCaller: {speech_result}"
    else:
        call.transcript = f"Caller: {speech_result}"
    
    # Get AI response using OpenAI
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    business = call.business
    
    # Create system prompt
    system_prompt = f"""You are an AI assistant for {business.name}. 
    You are handling after-hours calls professionally and courteously.
    Keep responses brief and natural for phone conversations.
    If the caller needs urgent assistance, offer to forward them to a human.
    If they want to schedule an appointment, collect their contact information."""
    
    try:
        # Get AI response
        completion = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": speech_result}
            ]
        )
        
        ai_response = completion.choices[0].message.content
        
        # Update transcript with AI response
        call.transcript += f"\nAI: {ai_response}"
        db.session.commit()
        
        # Create TwiML response
        response = VoiceResponse()
        response.say(ai_response, voice=business.ai_voice)
        
        # Check if we should continue the conversation
        if "goodbye" in ai_response.lower() or "thank you for calling" in ai_response.lower():
            response.hangup()
        else:
            # Continue gathering input
            gather = Gather(
                input='speech',
                action=f'/api/voice/process?call_id={call.id}',
                method='POST',
                timeout=5,
                speech_timeout='auto'
            )
            gather.say("Is there anything else I can help you with?", voice=business.ai_voice)
            response.append(gather)
            response.redirect('/api/voice/no-input')
        
        return str(response)
        
    except Exception as e:
        print(f"Error processing speech: {str(e)}")
        response = VoiceResponse()
        response.say("I apologize, but I'm having trouble processing your request. Please try again later.")
        response.hangup()
        return str(response)


@voice_bp.route('/no-input', methods=['POST', 'GET'])
def no_input():
    """Handle when caller doesn't provide input"""
    response = VoiceResponse()
    response.say("I didn't hear anything. Thank you for calling. Goodbye!")
    response.hangup()
    return str(response)


@voice_bp.route('/status', methods=['POST'])
def call_status():
    """Handle call status callbacks from Twilio"""
    
    call_sid = request.form.get('CallSid')
    call_status = request.form.get('CallStatus')
    call_duration = request.form.get('CallDuration', 0)
    
    # Find the call record
    call = Call.query.filter_by(call_sid=call_sid).first()
    
    if call:
        call.status = call_status
        call.duration = int(call_duration)
        
        if call_status == 'completed':
            call.ended_at = datetime.utcnow()
            
            # Update business minutes used
            minutes_used = int(call_duration) // 60 + (1 if int(call_duration) % 60 > 0 else 0)
            business = call.business
            business.minutes_used += minutes_used
            
            # Send email notification about completed call
            try:
                email_service.send_new_call_notification(business, call)
            except Exception as e:
                print(f"Failed to send email notification: {e}")
        
        db.session.commit()
    
    return jsonify({'status': 'success'}), 200

