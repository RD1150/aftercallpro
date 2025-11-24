from flask import Flask, request, session
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse, Gather
from openai import OpenAI
import os
from dotenv import load_dotenv
import json
from datetime import datetime

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "your-secret-key-change-in-production")

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# In-memory conversation storage (replace with database in production)
conversations = {}

# System prompt for the AI receptionist
SYSTEM_PROMPT = """You are a professional AI receptionist for AfterCallPro. 
Your role is to:
1. Greet callers warmly and professionally
2. Ask how you can help them
3. Collect relevant information (name, phone, reason for calling)
4. Book appointments if requested
5. Take messages for the business owner
6. Answer common questions about business hours, services, etc.

Keep responses brief (1-2 sentences) since this is a phone conversation.
Be friendly, professional, and helpful.
If the caller wants to book an appointment, collect: name, phone number, preferred date/time, and reason.
"""

# --- SMS HANDLER ---
@app.route("/sms", methods=["POST"])
def sms_reply():
    msg = request.form.get("Body")
    from_number = request.form.get("From")

    print(f"📩 SMS received from {from_number}: {msg}")

    resp = MessagingResponse()
    resp.message("Thank you for contacting AfterCallPro. Our team will follow up shortly.")
    return str(resp)

# --- VOICE HANDLER (INITIAL CALL) ---
@app.route("/voice", methods=["POST"])
def voice_incoming():
    """Handle incoming call - start the conversation"""
    call_sid = request.form.get("CallSid")
    from_number = request.form.get("From")
    
    print(f"📞 Incoming call from {from_number} (CallSid: {call_sid})")
    
    # Initialize conversation
    conversations[call_sid] = {
        "messages": [],
        "from_number": from_number,
        "started_at": datetime.now().isoformat(),
        "data_collected": {}
    }
    
    # Add system prompt
    conversations[call_sid]["messages"].append({
        "role": "system",
        "content": SYSTEM_PROMPT
    })
    
    # Get AI's greeting
    ai_greeting = get_ai_response(call_sid, None)
    
    # Create TwiML response
    response = VoiceResponse()
    
    # Speak the AI greeting
    response.say(ai_greeting, voice="Polly.Joanna")
    
    # Start gathering user input
    gather = Gather(
        input="speech",
        action="/voice/conversation",
        method="POST",
        speechTimeout="auto",
        language="en-US"
    )
    response.append(gather)
    
    # If no input, redirect back
    response.redirect("/voice/conversation")
    
    return str(response)

# --- CONVERSATION HANDLER ---
@app.route("/voice/conversation", methods=["POST"])
def voice_conversation():
    """Handle ongoing conversation - process user speech and respond"""
    call_sid = request.form.get("CallSid")
    speech_result = request.form.get("SpeechResult", "")
    
    print(f"🗣 User said: {speech_result}")
    
    # Get AI response
    ai_response = get_ai_response(call_sid, speech_result)
    
    print(f"🤖 AI responds: {ai_response}")
    
    # Check if conversation should end
    if should_end_conversation(ai_response, speech_result):
        return end_conversation(call_sid, ai_response)
    
    # Continue conversation
    response = VoiceResponse()
    response.say(ai_response, voice="Polly.Joanna")
    
    # Gather next input
    gather = Gather(
        input="speech",
        action="/voice/conversation",
        method="POST",
        speechTimeout="auto",
        language="en-US"
    )
    response.append(gather)
    
    # If no input, ask if they're still there
    response.say("Are you still there?", voice="Polly.Joanna")
    response.redirect("/voice/conversation")
    
    return str(response)

# --- AI RESPONSE GENERATOR ---
def get_ai_response(call_sid, user_message):
    """Get response from OpenAI GPT"""
    
    if call_sid not in conversations:
        conversations[call_sid] = {
            "messages": [{"role": "system", "content": SYSTEM_PROMPT}],
            "data_collected": {}
        }
    
    # Add user message if provided
    if user_message:
        conversations[call_sid]["messages"].append({
            "role": "user",
            "content": user_message
        })
    
    try:
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=conversations[call_sid]["messages"],
            max_tokens=150,
            temperature=0.7
        )
        
        ai_message = response.choices[0].message.content
        
        # Store AI response
        conversations[call_sid]["messages"].append({
            "role": "assistant",
            "content": ai_message
        })
        
        return ai_message
        
    except Exception as e:
        print(f"❌ OpenAI API error: {e}")
        return "I apologize, I'm having trouble processing that right now. Let me transfer you to our voicemail system."

# --- CONVERSATION END LOGIC ---
def should_end_conversation(ai_response, user_speech):
    """Determine if conversation should end"""
    end_keywords = ["goodbye", "bye", "thank you, goodbye", "that's all", "hang up"]
    
    ai_lower = ai_response.lower()
    user_lower = user_speech.lower() if user_speech else ""
    
    # Check if AI or user indicated end
    if any(keyword in ai_lower for keyword in ["goodbye", "have a great day", "talk to you soon"]):
        return True
    
    if any(keyword in user_lower for keyword in end_keywords):
        return True
    
    return False

def end_conversation(call_sid, final_message):
    """End the conversation gracefully"""
    response = VoiceResponse()
    response.say(final_message, voice="Polly.Joanna")
    response.say("Goodbye!", voice="Polly.Joanna")
    response.hangup()
    
    # Log conversation summary
    if call_sid in conversations:
        print(f"📝 Conversation ended for {call_sid}")
        print(f"   Duration: {len(conversations[call_sid]['messages'])} messages")
        print(f"   Data collected: {conversations[call_sid].get('data_collected', {})}")
        
        # TODO: Save to database
        # save_conversation_to_db(conversations[call_sid])
    
    return str(response)

# --- RECORDING HANDLER (FALLBACK) ---
@app.route("/voice/handle-recording", methods=["POST"])
def handle_recording():
    """Handle voicemail recording if AI conversation fails"""
    recording_url = request.form.get("RecordingUrl")
    call_sid = request.form.get("CallSid")
    
    print(f"🎙 Voicemail recorded: {recording_url} (CallSid: {call_sid})")
    
    resp = VoiceResponse()
    resp.say("Thank you. Your message has been received. We'll get back to you soon. Goodbye.", voice="Polly.Joanna")
    return str(resp)

# --- FALLBACK HANDLER ---
@app.route("/fallback", methods=["POST"])
def fallback():
    """Fallback for SMS or voice errors"""
    msg = request.form.get("Body")
    from_number = request.form.get("From")
    print(f"⚠️ Fallback triggered: {from_number} said '{msg}'")

    resp = MessagingResponse()
    resp.message("We received your message. Our team will follow up shortly.")
    return str(resp)

# --- STATUS ENDPOINT ---
@app.route("/status", methods=["GET"])
def status():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "AfterCallPro AI Receptionist",
        "active_conversations": len(conversations)
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

