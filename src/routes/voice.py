from flask import Blueprint, request, Response, jsonify, send_file
from twilio.twiml.voice_response import VoiceResponse, Gather
from src.models.call import db, Call, Business
from src.services.email_service import email_service
from src.services.elevenlabs_service import synthesize_to_file, AUDIO_DIR
from src.utils.twilio_security import twilio_webhook
from datetime import datetime
import os

voice_bp = Blueprint('voice', __name__)


def _public_audio_url(filename: str) -> str:
    base = os.environ.get("APP_BASE_URL", "https://aftercallpro.onrender.com").rstrip("/")
    return f"{base}/api/voice/audio/{filename}"


def speak(twiml_node, text: str, business):
    """Render `text` as audio onto a TwiML VoiceResponse or Gather node.

    Tries ElevenLabs first for natural voice; falls back to Twilio's <Say> if
    ElevenLabs isn't configured or the API call fails.
    """
    if not text:
        return
    filename = synthesize_to_file(text)
    if filename:
        twiml_node.play(_public_audio_url(filename))
    else:
        twiml_node.say(text, voice=(business.ai_voice if business else None) or "alloy")


@voice_bp.route('/audio/<filename>', methods=['GET'])
def serve_audio(filename):
    """Serve generated TTS files for Twilio's <Play>. Filenames are random
    UUIDs so they're unguessable; we still validate to prevent path traversal."""
    if "/" in filename or ".." in filename or not filename.endswith(".mp3"):
        return "bad filename", 400
    path = AUDIO_DIR / filename
    if not path.exists():
        return "not found", 404
    return send_file(str(path), mimetype="audio/mpeg")

@voice_bp.route('/incoming', methods=['POST'])
@twilio_webhook
def handle_incoming_call():
    """Handle incoming calls from Twilio"""
    
    # Get call details from Twilio
    from_number = request.form.get('From')
    to_number = request.form.get('To')
    call_sid = request.form.get('CallSid')

    # Match the dialed number to its owning business. Twilio numbers are stored
    # in business.twilio_number; we fall back to the legacy phone_number column
    # for older records that pre-date per-client provisioning.
    business = (
        Business.query.filter_by(twilio_number=to_number).first()
        or Business.query.filter_by(phone_number=to_number).first()
    )
    
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

    # Greet the caller (ElevenLabs if configured, falls back to Twilio Say).
    speak(response, business.greeting_message, business)

    # Gather user input
    gather = Gather(
        input='speech',
        action=f'/api/voice/process?call_id={call.id}',
        method='POST',
        timeout=5,
        speech_timeout='auto'
    )
    speak(gather, "Please tell me how I can help you today.", business)
    response.append(gather)
    
    # If no input, redirect
    response.redirect('/api/voice/no-input')
    
    return str(response)


@voice_bp.route('/process', methods=['POST'])
@twilio_webhook
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
    
    # Get AI response using enhanced AI service
    from src.services.ai_service import AIService
    
    business = call.business
    ai_service = AIService(business, call)
    
    # Build conversation history from transcript
    conversation_history = []
    if call.transcript:
        lines = call.transcript.split('\n')
        for line in lines:
            if line.startswith('Caller: '):
                conversation_history.append({"role": "user", "content": line[8:]})
            elif line.startswith('AI: '):
                conversation_history.append({"role": "assistant", "content": line[4:]})
    
    try:
        # Get AI response with appointment booking capability
        ai_response = ai_service.process_with_functions(speech_result, conversation_history)
        
        # Update transcript with AI response
        call.transcript += f"\nAI: {ai_response}"
        db.session.commit()
        
        # Create TwiML response
        response = VoiceResponse()
        speak(response, ai_response, business)

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
            speak(gather, "Is there anything else I can help you with?", business)
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
@twilio_webhook
def no_input():
    """Handle when caller doesn't provide input"""
    response = VoiceResponse()
    response.say("I didn't hear anything. Thank you for calling. Goodbye!")
    response.hangup()
    return str(response)


@voice_bp.route('/status', methods=['POST'])
@twilio_webhook
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

            # Trigger missed call recovery automation if call was short (likely missed/unanswered)
            # A call under 30 seconds with a transcript suggests the AI answered but caller hung up quickly
            if int(call_duration) < 30:
                try:
                    from src.services.automations import trigger_missed_call_recovery
                    trigger_missed_call_recovery(
                        business=business,
                        caller_number=call.from_number,
                        transcript=call.transcript or "",
                        call_summary=call.summary or ""
                    )
                except Exception as e:
                    print(f"Missed call recovery automation failed: {e}")
        
        db.session.commit()
    
    return jsonify({'status': 'success'}), 200

