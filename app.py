from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)

# --- SMS HANDLER ---
@app.route("/sms", methods=["POST"])
def sms_reply():
    msg = request.form.get("Body")
    from_number = request.form.get("From")

    print(f"📩 SMS received from {from_number}: {msg}")

    resp = MessagingResponse()
    resp.message("Thank you for contacting AfterCallPro. Our agents will follow up shortly.")
    return str(resp)

# --- VOICE HANDLER ---
@app.route("/voice", methods=["POST"])
def voice_reply():
    response = VoiceResponse()
    response.say("Thank you for calling AfterCallPro. Please leave your message after the tone.")
    response.record(maxLength="30", action="/voice/handle-recording")
    return str(response)

# --- RECORDING HANDLER ---
@app.route("/voice/handle-recording", methods=["POST"])
def handle_recording():
    recording_url = request.form.get("RecordingUrl")
    print(f"🎙 New voicemail recorded: {recording_url}")
    resp = VoiceResponse()
    resp.say("Thank you. Your message has been received. Goodbye.")
    return str(resp)

# --- FALLBACK HANDLER ---
@app.route("/fallback", methods=["POST"])
def fallback():
    msg = request.form.get("Body")
    from_number = request.form.get("From")
    print(f"⚠️ Fallback triggered: {from_number} said '{msg}'")

    resp = MessagingResponse()
    resp.message("We received your message. Our team will follow up shortly.")
    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
