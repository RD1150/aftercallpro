"""
automations.py — Native replacement for all GoHighLevel (GHL) workflows.

This module replicates the following GHL workflows entirely within the app:

1. Call Follow-Up
   GHL: Trigger=Transcript Generated → Wait → SMS → Add Task → Email → Internal Notification
   Here: Called after a short call's transcript is saved (caller hung up before
   finishing). Sends an SMS + email follow-up to re-engage the caller.

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

def _send_sms(to_number: str, body: str, from_number: str = None, business_id: int = None,
              idempotency_key: str = None, require_opt_in: bool = False):
    """Send an SMS through SmsService (opt-out gated, rate-limited, idempotent).

    Takes business_id (a plain int), never a Business ORM object — this runs in
    a delayed background thread where a detached ORM instance would raise
    DetachedInstanceError.

    require_opt_in: when True, the send is dropped unless the recipient has an
    explicit SMS opt-in on file. Used for messages to inbound callers, who have
    not consented to be texted just by calling.
    """
    from src.services.sms_service import SmsService
    result = SmsService.send(
        to=to_number,
        body=body,
        business_id=business_id,
        idempotency_key=idempotency_key,
        from_number=from_number,
        require_opt_in=require_opt_in,
    )
    return result.sent


def _send_email(to_email: str, subject: str, html_body: str, text_body: str = ""):
    """Send an email via the app's EmailService."""
    try:
        from src.services.email_service import email_service
        return email_service.send_email(to_email, subject, html_body, text_body)
    except Exception as e:
        logger.error("Email send failed to %s: %s", to_email, e)
        return False


def _run_after(delay_seconds: int, fn, *args, **kwargs):
    """Run a function in a background thread after a delay.

    Captures the current Flask app at scheduling time so the deferred work has
    a fresh app context — needed because SmsService and email_service touch
    `db.session`, which is bound to an app context.
    """
    from flask import current_app

    try:
        app = current_app._get_current_object()
    except RuntimeError:
        app = None

    def _worker():
        time.sleep(delay_seconds)
        try:
            if app is not None:
                with app.app_context():
                    fn(*args, **kwargs)
            else:
                fn(*args, **kwargs)
        except Exception as e:
            logger.error("Background automation error: %s", e)

    t = threading.Thread(target=_worker, daemon=True)
    t.start()


def notify_owner_new_lead(business, call):
    """Text the business owner the instant a call ends so they can call the
    lead back fast — speed to lead wins the job. Sent to the business's own
    phone number. Best-effort. Copy adapts: a captured call reads "new lead",
    a silent hang-up reads "missed call" so the owner isn't oversold.

    The SMS body is built here (synchronously, while `call` is a live ORM
    object); only plain strings are handed to the background sender.
    """
    owner_number = getattr(business, "phone_number", None)
    if not owner_number:
        return

    caller = call.from_number or "Unknown caller"
    intent = (call.caller_intent or call.summary or "").strip()
    if len(intent) > 140:
        intent = intent[:140].rstrip() + "…"

    # Did the caller actually say anything, or did they hang up before the AI
    # could help? A true hang-up has no caller turns in the transcript. Texting
    # the owner "new lead — caught a call" for a silent hang-up oversells it, so
    # we send an honest "missed call" alert instead. Same single text either way.
    transcript = call.transcript or ""
    caller_spoke = any(
        line.startswith("Caller: ") and line[len("Caller: "):].strip()
        for line in transcript.split("\n")
    )

    if caller_spoke:
        lines = [
            f"New lead — AfterCallPro caught a call for {business.name}.",
            f"Caller: {caller}",
        ]
        if intent:
            lines.append(intent)
        lines.append("Tap the number above to call them back.")
    else:
        lines = [
            f"Missed call for {business.name} — caller hung up before our AI could help.",
            f"Caller: {caller}",
            "No details captured. Tap the number above to call them back fast.",
        ]
    body = "\n".join(lines)

    # Fire near-immediately (a tiny delay keeps the Twilio status webhook
    # snappy). Idempotency-keyed on the call so duplicate status callbacks
    # never double-text the owner.
    _run_after(
        2,
        _send_sms,
        owner_number,
        body,
        business_id=business.id,
        idempotency_key=f"lead_alert:{call.id}",
    )


# ──────────────────────────────────────────────────────────────────────────────
# Workflow 1: Call Follow-Up
# ──────────────────────────────────────────────────────────────────────────────

def trigger_call_followup(business, caller_number: str, transcript: str):
    """
    Re-engages a caller who hung up before finishing (a short call). The AI
    answered — this is a follow-up, not a missed-call recovery.
    Trigger:  Transcript Generated (call ends and transcript is saved)
    Steps:    Wait 2 min → SMS → Add internal task → Email → Internal notification email
    """
    business_name = business.name
    business_email = business.email
    business_id = business.id

    # Use the business's custom SMS template if set, otherwise use a sensible default.
    if hasattr(business, 'format_sms_body'):
        sms_body = business.format_sms_body() + " Reply STOP to opt out."
    else:
        sms_body = (
            f"Hi! Thanks for calling {business_name}. If there's anything else "
            f"we can help with, just reply here and we'll take care of it. "
            f"Reply STOP to opt out."
        )

    internal_subject = f"[AfterCallPro] Short call from {caller_number} — follow-up needed"
    internal_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2>Call Follow-Up Needed</h2>
      <p><strong>Caller:</strong> {caller_number}</p>
      <p><strong>Business:</strong> {business_name}</p>
      <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}</p>
      {"<h3>Transcript:</h3><pre style='background:#f8fafc;padding:12px;border-radius:6px'>" + transcript + "</pre>" if transcript else ""}
      <p>Please follow up with this caller as soon as possible.</p>
    </div>
    """

    # Step 1: Wait 2 minutes, then SMS the caller — but ONLY if the caller has
    # an explicit SMS opt-in on file. An inbound call is not consent to text
    # the caller back, so require_opt_in=True; with no opt-in the send is
    # dropped (the internal email steps below still run, so the owner can
    # follow up by phone). No from_number override — the per-business local
    # number isn't registered for SMS, so SmsService sends from
    # SMS_FROM_NUMBER (the verified toll-free number). The body names the
    # business, so the caller still knows who it's from.
    _run_after(
        120,
        _send_sms,
        caller_number,
        sms_body,
        business_id=business_id,
        idempotency_key=f"call_followup:{business_id}:{caller_number}",
        require_opt_in=True,
    )

    # Step 2: Wait 3 minutes, then send follow-up email to caller
    # (We use caller_number as a proxy — in production, look up email from CRM)
    # For now, send the internal notification email to the business owner
    _run_after(180, _send_email, business_email, internal_subject, internal_html)

    logger.info("Call follow-up triggered for business %s, caller %s", business_id, caller_number)


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
        _run_after(
            3600,
            _send_sms,
            customer_phone,
            sms_body,
            business_id=business.id,
            idempotency_key=f"no_show_sms:{business.id}:{getattr(appointment, 'id', '?')}",
        )

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
    _run_after(
        3600,
        _send_sms,
        business_phone,
        sms_body,
        business_id=business.id,
        idempotency_key=f"payment_onboarding_sms:{business.id}",
    )

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
    _run_after(
        30,
        _send_sms,
        business_phone,
        sms_body,
        business_id=business.id,
        idempotency_key=f"new_contact_sms:{business.id}",
    )

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
