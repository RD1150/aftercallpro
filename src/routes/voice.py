from flask import Blueprint, request, Response, jsonify, send_file
from twilio.twiml.voice_response import VoiceResponse, Gather
from src.models.call import db, Call, Business
from src.services.email_service import email_service
from src.services.elevenlabs_service import synthesize_to_file, AUDIO_DIR
from src.utils.twilio_security import twilio_webhook
from datetime import datetime
import os

voice_bp = Blueprint('voice', __name__)

# How long Twilio waits for silence before deciding the caller finished
# speaking. Lower = snappier replies; too low can clip slow speakers (e.g.
# spelling out an email). Tunable via env so it can be adjusted without a deploy.
SPEECH_TIMEOUT = int(os.environ.get("VOICE_SPEECH_TIMEOUT", "1"))

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

    # Put the greeting INSIDE the gather so Twilio listens during playback
    # (barge-in). actionOnEmptyResult=True ensures we always reach
    # process_speech even when Twilio doesn't catch the speech, so the AI
    # can ask "sorry, didn't catch that — could you say your name again?"
    # instead of Twilio's harsh "I didn't hear anything, goodbye" bailout.
    gather = Gather(
        input='speech',
        action=f'/api/voice/process?call_id={call.id}',
        method='POST',
        timeout=10,
        speech_timeout=SPEECH_TIMEOUT,
        action_on_empty_result=True,
    )
    speak(gather, business.greeting_message, business)
    response.append(gather)
    
    # If no input, redirect
    response.redirect('/api/voice/no-input')
    
    return str(response)


@voice_bp.route('/process', methods=['POST'])
@twilio_webhook
def process_speech():
    """Process the caller's speech input"""

    call_id = request.args.get('call_id')
    speech_result = (request.form.get('SpeechResult') or '').strip()

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

    # Empty speech: Twilio didn't catch the caller. Reprompt instead of
    # bailing to /no-input so the conversation survives a missed word.
    if not speech_result:
        business = call.business
        response = VoiceResponse()
        gather = Gather(
            input='speech',
            action=f'/api/voice/process?call_id={call.id}',
            method='POST',
            timeout=10,
            speech_timeout=SPEECH_TIMEOUT,
            action_on_empty_result=True,
        )
        speak(gather, "Sorry, I didn't catch that. Could you say it again?", business)
        response.append(gather)
        response.redirect('/api/voice/no-input')
        return str(response)

    # Update call transcript
    if call.transcript:
        call.transcript += f"\nCaller: {speech_result}"
    else:
        call.transcript = f"Caller: {speech_result}"

    business = call.business

    try:
        # Every turn — including the first — goes through the AI. The greeting
        # is just an opener; it doesn't reliably ask for the caller's name, so
        # we never assume turn 1 is a name. The AI collects the name naturally.
        from src.services.ai_service import AIService
        ai_service = AIService(business, call)

        # Build conversation history from prior turns. Drop the trailing
        # caller line we just appended — process_with_functions adds the
        # current message itself, so leaving it in would duplicate it.
        conversation_history = []
        for line in call.transcript.split('\n'):
            if line.startswith('Caller: '):
                conversation_history.append({"role": "user", "content": line[8:]})
            elif line.startswith('AI: '):
                conversation_history.append({"role": "assistant", "content": line[4:]})
        if conversation_history and conversation_history[-1]["role"] == "user":
            conversation_history.pop()

        ai_response = ai_service.process_with_functions(speech_result, conversation_history)
        
        # Update transcript with AI response
        call.transcript += f"\nAI: {ai_response}"
        db.session.commit()
        
        # Create TwiML response
        response = VoiceResponse()

        # Check if we should continue the conversation
        if "goodbye" in ai_response.lower() or "thank you for calling" in ai_response.lower():
            speak(response, ai_response, business)
            response.hangup()
        else:
            # Same pattern as the initial gather: put the AI's reply INSIDE
            # the gather so Twilio listens during playback (barge-in) and the
            # post-reply pause window is generous.
            gather = Gather(
                input='speech',
                action=f'/api/voice/process?call_id={call.id}',
                method='POST',
                timeout=10,
                speech_timeout=SPEECH_TIMEOUT,
                action_on_empty_result=True,
            )
            speak(gather, ai_response, business)
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

            # Distil the transcript into summary/intent/sentiment so the lead
            # shows useful info in the dashboard instead of blank fields.
            try:
                from src.services.ai_service import summarize_call
                summarize_call(call)
            except Exception as e:
                print(f"Call summarization failed: {e}")

            # Send email notification about completed call
            try:
                email_service.send_new_call_notification(business, call)
            except Exception as e:
                print(f"Failed to send email notification: {e}")

            # Trigger a call follow-up if the call was short. The AI answers
            # every call, so a sub-30s call means the caller hung up before
            # finishing — re-engage them with a follow-up SMS + email.
            if int(call_duration) < 30:
                try:
                    from src.services.automations import trigger_call_followup
                    trigger_call_followup(
                        business=business,
                        caller_number=call.from_number,
                        transcript=call.transcript or ""
                    )
                except Exception as e:
                    print(f"Call follow-up automation failed: {e}")

            # Push the captured lead to any connected CRMs. Best-effort —
            # never let a CRM hiccup break the Twilio status callback.
            try:
                from src.services.integration_dispatch import push_call_to_integrations
                push_call_to_integrations(business, call)
            except Exception as e:
                print(f"Integration push failed: {e}")
        
        db.session.commit()
    
    return jsonify({'status': 'success'}), 200

