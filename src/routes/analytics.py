from flask import Blueprint, request, jsonify, session
from src.models.call import db, Business, Call
from datetime import datetime, timedelta
from sqlalchemy import func, text

analytics_bp = Blueprint('analytics', __name__)


def require_auth():
    if 'user_id' not in session:
        return None, jsonify({'error': 'Unauthorized'}), 401
    return session['user_id'], None, None


@analytics_bp.route('/analytics', methods=['GET'])
def get_analytics():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    days = int(request.args.get('days', 30))
    since = datetime.utcnow() - timedelta(days=days)

    business = Business.query.filter_by(user_id=user_id).first()
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    # All calls for this business in the period
    calls = Call.query.filter(
        Call.business_id == business.id,
        Call.created_at >= since
    ).order_by(Call.created_at.desc()).all()

    total_calls = len(calls)
    missed_calls = sum(1 for c in calls if c.status == 'missed' or c.call_type == 'missed')
    missed_pct = round((missed_calls / total_calls * 100) if total_calls > 0 else 0)

    # Calls today
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    calls_today = Call.query.filter(
        Call.business_id == business.id,
        Call.created_at >= today_start
    ).count()

    # SMS sent (calls that had sms_sent flag or sms_response)
    sms_sent = sum(1 for c in calls if getattr(c, 'sms_sent', False) or getattr(c, 'sms_response', None))

    # Average duration
    durations = [c.duration_seconds for c in calls if c.duration_seconds and c.duration_seconds > 0]
    avg_duration = round(sum(durations) / len(durations)) if durations else 0

    # Sentiment breakdown
    sentiment_counts = {'positive': 0, 'neutral': 0, 'negative': 0}
    for c in calls:
        s = getattr(c, 'sentiment', None)
        if s and s.lower() in sentiment_counts:
            sentiment_counts[s.lower()] += 1
        else:
            sentiment_counts['neutral'] += 1

    # Call volume chart (last N days, grouped by day)
    chart_data = []
    for i in range(min(days, 14), -1, -1):
        day = datetime.utcnow() - timedelta(days=i)
        day_start = day.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        count = sum(1 for c in calls if day_start <= c.created_at < day_end)
        chart_data.append({
            'label': day.strftime('%m/%d') if days <= 30 else day.strftime('%b %d'),
            'count': count,
        })

    # Leads captured (try to import Lead model)
    leads_captured = 0
    appointments_booked = 0
    try:
        from src.models.lead import Lead
        leads_captured = Lead.query.filter(
            Lead.business_id == business.id,
            Lead.created_at >= since
        ).count()
    except Exception:
        pass

    try:
        from src.models.appointment import Appointment
        appointments_booked = Appointment.query.filter(
            Appointment.business_id == business.id,
            Appointment.created_at >= since
        ).count()
    except Exception:
        pass

    # Top call reasons from summaries
    top_reasons = []
    reason_counts = {}
    for c in calls:
        summary = getattr(c, 'summary', None) or getattr(c, 'ai_summary', None)
        if summary:
            # Simple keyword extraction
            keywords = ['appointment', 'quote', 'price', 'information', 'complaint', 'emergency', 'reschedule', 'cancel', 'hours', 'location']
            for kw in keywords:
                if kw in summary.lower():
                    reason_counts[kw.capitalize()] = reason_counts.get(kw.capitalize(), 0) + 1
    top_reasons = [{'reason': k, 'count': v} for k, v in sorted(reason_counts.items(), key=lambda x: -x[1])[:5]]

    # Recent calls
    recent_calls = []
    for c in calls[:10]:
        recent_calls.append({
            'id': c.id,
            'caller_number': getattr(c, 'caller_number', None) or getattr(c, 'from_number', None),
            'created_at': c.created_at.isoformat() if c.created_at else None,
            'duration_seconds': c.duration_seconds,
            'status': c.status,
            'sentiment': getattr(c, 'sentiment', None),
        })

    # Minutes usage
    minutes_used = getattr(business, 'minutes_used', 0) or 0
    minutes_limit = getattr(business, 'monthly_minutes_limit', 1500) or 1500

    return jsonify({
        'total_calls': total_calls,
        'missed_calls': missed_calls,
        'missed_pct': missed_pct,
        'calls_today': calls_today,
        'sms_sent': sms_sent,
        'leads_captured': leads_captured,
        'appointments_booked': appointments_booked,
        'avg_duration_sec': avg_duration,
        'sentiment': sentiment_counts,
        'call_volume_chart': chart_data,
        'top_reasons': top_reasons,
        'recent_calls': recent_calls,
        'minutes_used': minutes_used,
        'minutes_limit': minutes_limit,
    }), 200
