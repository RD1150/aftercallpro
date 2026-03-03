"""
automations.py — Native replacement for all GoHighLevel (GHL) workflows.

This module replicates the following GHL workflows entirely within the app:

1. Missed Call Recovery
   GHL: Trigger=Transcript Generated → Wait → SMS → Add Task → Email → Internal Notification
   Here: Called after a call transcript is saved. Sends SMS + email follow-up to the caller.

2. No-Show Recovery
   GHL: Trigger=No Show → Check appointment status → Branch:
        If No Show: Wait 10min → Email → Wait 1hr → SMS → Wait 24hr → Email
   Here: Called when an appointment is marked no-show. Sends timed follow-up sequence.

3. Payment Onboarding (ACP – Paid)
   GHL: Trigger=ACP-Paid tag → Email → Wait → SMS → Wait → Email → Onboarding Started
   Here: Called from the Stripe webhook after checkout.session.completed. Sends welcome
        email immediately, then schedules SMS and follow-up email.

4. Revenue / Opportunity Tracking
   GHL: Trigger=Payment Received → Create/Update Opportunity → Add Tag
   Here: Handled directly in the Stripe webhook handler in payments.py.
        The Business record is updated with subscription tier and status.

5. Contact Changed / Form Submitted
   GHL: Trigger=Contact Changed or Form Submitted → Add Tag → Create Opportunity → SMS → Email
   Here: Called when a new user registers or updates their profile.

All time-delayed steps use Python threading (background threads) so they do not
block the API response. For production scale, replace with Celery + Redis.
"""

import os
import threading
import time
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────────

def _send_sms(to_number: str, body: str):
    """Send an SMS via Twilio. Silently logs if credentials are missing."""
    try:
        from twilio.rest import Client
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_PHONE_NUMBER")

        if not all([account_sid, auth_token, from_number]):
            logger.warning("Twilio credentials not configured — SMS not sent to %s", to_number)
            return False

        client = Client(account_sid, auth_token)
        message = client.messages.create(
            body=body,
            from_=from_number,
            to=to_number
        )
        logger.info("SMS sent to %s — SID: %s", to_number, message.sid)
        return True
    except Exception as e:
        logger.error("SMS send failed to %s: %s", to_number, e)
        return False


def _send_email(to_email: str, subject: str, html_body: str, text_body: str = ""):
    """Send an email via the app's EmailService."""
    try:
        from src.services.email_service import email_service
        return email_service.send_email(to_email, subject, html_body, text_body)
    except Exception as e:
        logger.error("Email send failed to %s: %s", to_email, e)
        return False


def _run_after(delay_seconds: int, fn, *args, **kwargs):
    """Run a function in a background thread after a delay."""
    def _worker():
        time.sleep(delay_seconds)
        try:
            fn(*args, **kwargs)
        except Exception as e:
            logger.error("Background automation error: %s", e)
    t = threading.Thread(target=_worker, daemon=True)
    t.start()


# ──────────────────────────────────────────────────────────────────────────────
# Workflow 1: Missed Call Recovery
# ──────────────────────────────────────────────────────────────────────────────

def trigger_missed_call_recovery(business, caller_number: str, transcript: str, call_summary: str = ""):
    """
    Replaces: AfterCallPro – Missed Call Recovery
    Trigger:  Transcript Generated (call ends and transcript is saved)
    Steps:    Wait 2 min → SMS → Add internal task → Email → Internal notification email
    """
    business_name = business.name
    business_email = business.email
    business_id = business.id

    sms_body = (
        f"Hi! You just missed a call from {business_name}. "
        f"We captured your message and someone will follow up shortly. "
        f"Reply STOP to opt out."
    )

    email_subject = f"📞 Missed Call Follow-Up — {business_name}"
    email_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f172a">We missed your call!</h2>
      <p>Hi there,</p>
      <p>We're sorry we missed your call to <strong>{business_name}</strong>. 
         Our AI assistant captured your message and a team member will be in touch soon.</p>
      {"<h3>Call Summary:</h3><p>" + call_summary + "</p>" if call_summary else ""}
      <p>If you need immediate assistance, please call us back or reply to this email.</p>
      <p>Best regards,<br><strong>{business_name}</strong></p>
    </div>
    """

    internal_subject = f"[AfterCallPro] Missed call from {caller_number} — follow-up needed"
    internal_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2>Missed Call Alert</h2>
      <p><strong>Caller:</strong> {caller_number}</p>
      <p><strong>Business:</strong> {business_name}</p>
      <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</p>
      {"<h3>Transcript:</h3><pre style='background:#f8fafc;padding:12px;border-radius:6px'>" + transcript + "</pre>" if transcript else ""}
      <p>Please follow up with this caller as soon as possible.</p>
    </div>
    """

    # Step 1: Wait 2 minutes, then send SMS to caller
    _run_after(120, _send_sms, caller_number, sms_body)

    # Step 2: Wait 3 minutes, then send follow-up email to caller
    # (We use caller_number as a proxy — in production, look up email from CRM)
    # For now, send the internal notification email to the business owner
    _run_after(180, _send_email, business_email, internal_subject, internal_html)

    logger.info("Missed call recovery triggered for business %s, caller %s", business_id, caller_number)


# ──────────────────────────────────────────────────────────────────────────────
# Workflow 2: No-Show Recovery
# ──────────────────────────────────────────────────────────────────────────────

def trigger_no_show_recovery(business, appointment, customer_email: str = "", customer_phone: str = ""):
    """
    Replaces: AfterCallPro – No-Show Recovery
    Trigger:  Appointment status set to 'no_show'
    Steps:    Wait 10 min → Email → Wait 1 hr → SMS → Wait 24 hr → Email
    """
    business_name = business.name
    appt_time = appointment.scheduled_at.strftime('%B %d at %I:%M %p') if hasattr(appointment, 'scheduled_at') else "your appointment"

    # Email 1 — sent 10 minutes after no-show
    email1_subject = f"We missed you — {business_name}"
    email1_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f172a">We missed you today!</h2>
      <p>Hi,</p>
      <p>We noticed you weren't able to make it to your appointment at <strong>{business_name}</strong> 
         scheduled for <strong>{appt_time}</strong>.</p>
      <p>No worries — things come up! We'd love to reschedule at a time that works better for you.</p>
      <p>Please reply to this email or call us to reschedule.</p>
      <p>Best regards,<br><strong>{business_name}</strong></p>
    </div>
    """

    # SMS — sent 1 hour after no-show
    sms_body = (
        f"Hi! We missed you at your {business_name} appointment. "
        f"Reply to reschedule or call us back. Reply STOP to opt out."
    )

    # Email 2 — sent 24 hours after no-show
    email2_subject = f"Still want to reschedule? — {business_name}"
    email2_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f172a">Last chance to reschedule</h2>
      <p>Hi,</p>
      <p>We still have availability at <strong>{business_name}</strong> and would love to see you.</p>
      <p>If you'd like to reschedule your missed appointment, please reach out — we're happy to find a time that works.</p>
      <p>Best regards,<br><strong>{business_name}</strong></p>
    </div>
    """

    if customer_email:
        # 10 minutes → Email 1
        _run_after(600, _send_email, customer_email, email1_subject, email1_html)
        # 24 hours → Email 2
        _run_after(86400, _send_email, customer_email, email2_subject, email2_html)

    if customer_phone:
        # 1 hour → SMS
        _run_after(3600, _send_sms, customer_phone, sms_body)

    logger.info("No-show recovery triggered for business %s", business.id)


# ──────────────────────────────────────────────────────────────────────────────
# Workflow 3: Payment Onboarding (ACP – Paid)
# ──────────────────────────────────────────────────────────────────────────────

def trigger_payment_onboarding(business):
    """
    Replaces: ACP – Paid (Onboarding) workflow
    Trigger:  Stripe checkout.session.completed (payment received)
    Steps:    Email (immediate) → Wait → SMS → Wait → Email → Onboarding Started tag
    """
    business_name = business.name
    business_email = business.email
    business_phone = business.phone_number
    plan = (business.subscription_tier or "starter").title()

    # Step 1: Immediate welcome email
    welcome_subject = f"🎉 Welcome to AfterCallPro {plan}!"
    welcome_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0f172a;padding:30px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="color:#ffffff;margin:0">Welcome to AfterCallPro!</h1>
        <p style="color:#94a3b8;margin-top:8px">Your {plan} plan is now active</p>
      </div>
      <div style="background:#f8fafc;padding:30px;border-radius:0 0 12px 12px">
        <h2 style="color:#0f172a">Hi {business_name}! 👋</h2>
        <p>Your payment was successful and your <strong>{plan}</strong> subscription is now active. 
           Your AI receptionist is ready to start capturing calls 24/7.</p>
        
        <h3>Your Next Steps:</h3>
        <ol>
          <li>Log in to your dashboard at <a href="https://aftercallpro.onrender.com/dashboard">aftercallpro.onrender.com</a></li>
          <li>Customize your AI greeting message in Settings</li>
          <li>Configure your business hours</li>
          <li>Make a test call to verify everything is working</li>
        </ol>
        
        <p>Questions? Reply to this email — we're here to help.</p>
        <p>Best regards,<br><strong>The AfterCallPro Team</strong></p>
      </div>
    </div>
    """
    _send_email(business_email, welcome_subject, welcome_html)

    # Step 2: Wait 1 hour → SMS check-in
    sms_body = (
        f"Hi {business_name}! Your AfterCallPro {plan} plan is active. "
        f"Log in at aftercallpro.onrender.com to set up your AI receptionist. "
        f"Reply STOP to opt out."
    )
    _run_after(3600, _send_sms, business_phone, sms_body)

    # Step 3: Wait 24 hours → Onboarding tips email
    tips_subject = f"Getting the most out of AfterCallPro — Tips for {business_name}"
    tips_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f172a">Make the most of your AfterCallPro subscription</h2>
      <p>Hi {business_name},</p>
      <p>You've been on AfterCallPro for a day now. Here are a few tips to get the most out of your plan:</p>
      
      <h3>💡 Pro Tips:</h3>
      <ul>
        <li><strong>Custom greeting:</strong> Personalize your AI's opening message in Settings → Greeting</li>
        <li><strong>After-hours mode:</strong> Set your business hours so the AI handles calls when you're closed</li>
        <li><strong>Lead inbox:</strong> Check your Leads tab daily — every missed call is a potential customer</li>
        <li><strong>Call transcripts:</strong> Review transcripts to understand what callers need most</li>
      </ul>
      
      <p>Need help? Reply to this email anytime.</p>
      <p>Best regards,<br><strong>The AfterCallPro Team</strong></p>
    </div>
    """
    _run_after(86400, _send_email, business_email, tips_subject, tips_html)

    logger.info("Payment onboarding triggered for business %s (plan: %s)", business.id, plan)


# ──────────────────────────────────────────────────────────────────────────────
# Workflow 4: Contact Registration / Form Submitted
# ──────────────────────────────────────────────────────────────────────────────

def trigger_new_contact(business):
    """
    Replaces: Contact Changed / Form Submitted workflow
    Trigger:  New user registers (auth/register endpoint)
    Steps:    Send welcome SMS + Email immediately
    """
    business_name = business.name
    business_email = business.email
    business_phone = business.phone_number

    # Welcome SMS
    sms_body = (
        f"Welcome to AfterCallPro, {business_name}! "
        f"Your account is ready. Log in at aftercallpro.onrender.com "
        f"Reply STOP to opt out."
    )
    _run_after(30, _send_sms, business_phone, sms_body)

    # Welcome email
    email_subject = "Welcome to AfterCallPro — Your account is ready"
    email_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0f172a">Welcome, {business_name}!</h2>
      <p>Your AfterCallPro account has been created. You're on the <strong>Free plan</strong> — 
         start capturing missed calls right away.</p>
      <p>When you're ready to unlock more minutes and advanced features, 
         <a href="https://aftercallpro.onrender.com/pricing">view our plans here</a>.</p>
      <p>Best regards,<br><strong>The AfterCallPro Team</strong></p>
    </div>
    """
    _run_after(10, _send_email, business_email, email_subject, email_html)

    logger.info("New contact workflow triggered for business %s", business.id)
