"""Customer-facing analytics for the logged-in business.

Returns the shape Analytics.jsx already consumes (caller_number,
duration_seconds, etc.) — those keys are an API contract; the model
uses from_number / duration internally and we translate at the edge.
"""

from collections import Counter
from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request, session

from src.models.call import db, Business, Call
from src.models.user import User

analytics_bp = Blueprint("analytics", __name__)

# Status values Twilio uses when no human conversation happened.
MISSED_STATUSES = {"no-answer", "busy", "failed", "canceled"}
# Heuristic from voice.py: <30s duration with no transcript means the AI
# answered but the caller hung up almost immediately.
SHORT_CALL_THRESHOLD = 30


def _current_business():
    user_id = session.get("user_id")
    if not user_id:
        return None, (jsonify({"error": "Unauthorized"}), 401)
    user = User.query.get(user_id)
    if not user:
        return None, (jsonify({"error": "Unauthorized"}), 401)
    business = Business.query.filter_by(email=user.email).first()
    if not business:
        return None, (jsonify({"error": "Business not found"}), 404)
    return business, None


def _is_missed(call):
    if (call.status or "").lower() in MISSED_STATUSES:
        return True
    if (call.duration or 0) < SHORT_CALL_THRESHOLD and not call.transcript:
        return True
    return False


@analytics_bp.route("/analytics", methods=["GET"])
def get_analytics():
    business, err = _current_business()
    if err:
        return err

    days = max(1, min(int(request.args.get("days", 30)), 365))
    since = datetime.utcnow() - timedelta(days=days)

    calls = (
        Call.query.filter(
            Call.business_id == business.id,
            Call.started_at >= since,
        )
        .order_by(Call.started_at.desc())
        .all()
    )

    total_calls = len(calls)
    missed_calls = sum(1 for c in calls if _is_missed(c))
    missed_pct = round((missed_calls / total_calls * 100) if total_calls else 0)

    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    calls_today = sum(1 for c in calls if c.started_at and c.started_at >= today_start)

    # SMS sent — read from the canonical SmsSendLog (security pass introduced
    # this as the chokepoint; counting flags on Call would undercount).
    sms_sent = 0
    try:
        from src.models.sms import SmsSendLog
        sms_sent = (
            SmsSendLog.query.filter(
                SmsSendLog.business_id == business.id,
                SmsSendLog.created_at >= since,
                SmsSendLog.status == "sent",
            ).count()
        )
    except Exception:
        pass

    durations = [c.duration for c in calls if c.duration and c.duration > 0]
    avg_duration = round(sum(durations) / len(durations)) if durations else 0

    sentiment_counts = {"positive": 0, "neutral": 0, "negative": 0}
    for c in calls:
        s = (c.sentiment or "").lower()
        if s in sentiment_counts:
            sentiment_counts[s] += 1
        elif c.sentiment:
            sentiment_counts["neutral"] += 1

    # Daily volume — last min(days, 14) buckets so the chart stays readable.
    chart_data = []
    bucket_count = min(days, 14)
    for i in range(bucket_count - 1, -1, -1):
        day = datetime.utcnow() - timedelta(days=i)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        count = sum(
            1 for c in calls if c.started_at and day_start <= c.started_at < day_end
        )
        chart_data.append({
            "label": day.strftime("%m/%d") if days <= 30 else day.strftime("%b %d"),
            "count": count,
        })

    # Lead count = unique callers in the period (a single phone calling
    # multiple times is still one lead). Per the no-CRM stance we don't keep
    # a Contact table, so we derive this from Call rows.
    leads_captured = len({c.from_number for c in calls if c.from_number})

    appointments_booked = 0
    try:
        from src.models.appointment import Appointment
        appointments_booked = (
            Appointment.query.filter(
                Appointment.business_id == business.id,
                Appointment.created_at >= since,
            ).count()
        )
    except Exception:
        pass

    # Top reasons — keyword scan of summaries. Cheap heuristic; gives the
    # operator a sense of what callers are asking for.
    KEYWORDS = [
        "appointment", "estimate", "quote", "price", "emergency",
        "schedule", "reschedule", "cancel", "hours", "location",
        "service", "repair", "install", "consultation",
    ]
    reason_counter = Counter()
    for c in calls:
        text_blob = " ".join(filter(None, [c.summary, c.caller_intent])).lower()
        if not text_blob:
            continue
        for kw in KEYWORDS:
            if kw in text_blob:
                reason_counter[kw.capitalize()] += 1
    top_reasons = [
        {"reason": r, "count": n}
        for r, n in reason_counter.most_common(5)
    ]

    recent_calls = []
    for c in calls[:10]:
        ts = c.started_at or c.created_at
        recent_calls.append({
            "id": c.id,
            "caller_number": c.from_number,
            "created_at": ts.isoformat() if ts else None,
            "duration_seconds": c.duration or 0,
            "status": "missed" if _is_missed(c) else (c.status or "completed"),
            "sentiment": c.sentiment,
        })

    minutes_used = business.minutes_used or 0
    minutes_limit = business.monthly_minutes_limit or 500

    return jsonify({
        "total_calls": total_calls,
        "missed_calls": missed_calls,
        "missed_pct": missed_pct,
        "calls_today": calls_today,
        "sms_sent": sms_sent,
        "leads_captured": leads_captured,
        "appointments_booked": appointments_booked,
        "avg_duration_sec": avg_duration,
        "sentiment": sentiment_counts,
        "call_volume_chart": chart_data,
        "top_reasons": top_reasons,
        "recent_calls": recent_calls,
        "minutes_used": minutes_used,
        "minutes_limit": minutes_limit,
    }), 200
