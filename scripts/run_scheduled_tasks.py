"""Periodic scheduled tasks for AfterCallPro — run by a Render Cron Job.

Run hourly:
    PYTHONPATH=. python3 scripts/run_scheduled_tasks.py

Everything here is idempotent — per-row flags (reminder_sent) and the
monthly hour-guard mean re-running never double-sends.

  1. Appointment reminders — SMS ~24h before the appointment.
  2. Review requests — SMS a few hours after the appointment (only for
     businesses that have set a Google review link).
  3. Monthly ROI summary emails — once, on the 1st of the month at 13:00 UTC.
"""

import os
import sys
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business
from src.models.appointment import Appointment
from src.services.sms_service import SmsService

UTC = ZoneInfo("UTC")


def _local(dt, tz_name):
    """appointment_datetime is stored naive-UTC (Postgres session tz = UTC);
    render it in the business's local timezone for the customer."""
    tz = ZoneInfo(tz_name or "America/New_York")
    return dt.replace(tzinfo=UTC).astimezone(tz)


def send_appointment_reminders(now):
    """Text a reminder for appointments 2-26h out that haven't been reminded.
    The 2h floor avoids a reminder landing right after the booking
    confirmation; reminder_sent dedupes across hourly runs."""
    rows = Appointment.query.filter(
        Appointment.reminder_sent.isnot(True),
        Appointment.status.in_(["scheduled", "confirmed"]),
        Appointment.appointment_datetime > now + timedelta(hours=2),
        Appointment.appointment_datetime <= now + timedelta(hours=26),
    ).all()
    sent = 0
    for appt in rows:
        if not appt.customer_phone:
            continue
        biz = Business.query.get(appt.business_id)
        if not biz:
            continue
        when = _local(appt.appointment_datetime, appt.timezone).strftime(
            "%A, %B %-d at %-I:%M %p")
        body = (
            f"Reminder: your {appt.appointment_type or 'appointment'} with "
            f"{biz.name} is {when}. See you then! Need to change it? "
            f"Just call us back."
        )
        result = SmsService.send(
            to=appt.customer_phone,
            body=body,
            business_id=biz.id,
            idempotency_key=f"appt_reminder:{appt.id}",
        )
        if getattr(result, "sent", False):
            appt.reminder_sent = True
            appt.reminder_sent_at = datetime.utcnow()
            db.session.commit()
            sent += 1
            print(f"  reminder -> {appt.customer_phone} (appt {appt.id})")
    return sent


def send_review_requests(now):
    """Text a review request 3-72h after the appointment, for businesses that
    have set a Google review link. review_requested dedupes; appointments
    naturally age out of the 72h window if no link is ever configured."""
    rows = Appointment.query.filter(
        Appointment.review_requested.isnot(True),
        Appointment.status.in_(["scheduled", "confirmed", "completed"]),
        Appointment.appointment_datetime > now - timedelta(hours=72),
        Appointment.appointment_datetime <= now - timedelta(hours=3),
    ).all()
    sent = 0
    for appt in rows:
        if not appt.customer_phone:
            continue
        biz = Business.query.get(appt.business_id)
        if not biz:
            continue
        link = (getattr(biz, "review_link", None) or "").strip()
        if not link:
            continue  # no review link configured — skip, leave un-flagged
        body = (
            f"Thanks for choosing {biz.name}! If you have a moment, a quick "
            f"review would mean a lot: {link}"
        )
        result = SmsService.send(
            to=appt.customer_phone,
            body=body,
            business_id=biz.id,
            idempotency_key=f"appt_review:{appt.id}",
        )
        if getattr(result, "sent", False):
            appt.review_requested = True
            appt.review_requested_at = datetime.utcnow()
            db.session.commit()
            sent += 1
            print(f"  review request -> {appt.customer_phone} (appt {appt.id})")
    return sent


def run_monthly_summaries_if_due(now):
    """On the 1st of the month at 13:00 UTC, email each active business its
    prior month's ROI recap. The hour guard makes an hourly cron fire this
    exactly once per month."""
    if now.day != 1 or now.hour != 13:
        return 0
    from src.routes.analytics import compute_roi
    from src.services.email_service import email_service

    this_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    last_month = (this_month - timedelta(days=1)).replace(day=1)
    label = last_month.strftime("%B %Y")
    sent = 0
    for biz in Business.query.filter(
            Business.subscription_status.in_(["active", "trialing"])).all():
        if not biz.email:
            continue
        data = compute_roi(biz, last_month, until=this_month)
        if data["calls_answered"] == 0:
            continue
        if email_service.send_monthly_roi(biz, label, data):
            sent += 1
            print(f"  monthly summary -> {biz.email}")
    return sent


def main():
    with app.app_context():
        now = datetime.utcnow()
        print(f"Scheduled tasks @ {now.isoformat()}Z")
        reminders = send_appointment_reminders(now)
        reviews = send_review_requests(now)
        monthly = run_monthly_summaries_if_due(now)
        print(f"done — {reminders} reminder(s), {reviews} review request(s), "
              f"{monthly} monthly summary email(s)")


if __name__ == "__main__":
    main()
