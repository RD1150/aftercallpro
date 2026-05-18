"""Subscriber-facing call/lead-log API.

Per the no-CRM stance (memory: aftercallpro_no_crm), we do NOT store contacts
or threaded notes. Just enough to mark a call followed-up on and to send a
retarget SMS via the existing SmsService chokepoint.
"""

from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, session
from sqlalchemy import or_

from src.models.call import db, Business, Call
from src.services.sms_service import SmsService

calls_bp = Blueprint("calls", __name__)

VALID_STATUSES = {"new", "called_back", "done"}

# A call that never receives a terminal Twilio status callback stays stuck in a
# non-terminal state forever. Anything older than this is reclassified to
# 'abandoned' on the next dashboard load — a lazy sweep, no cron job needed.
_STALE_CALL_AGE = timedelta(hours=2)
_NON_TERMINAL_STATUSES = ("initiated", "queued", "ringing", "in-progress")


def _sweep_stale_calls(business_id):
    """Mark this business's non-terminal calls older than _STALE_CALL_AGE as
    'abandoned' so the lead log isn't polluted by calls that never closed."""
    cutoff = datetime.utcnow() - _STALE_CALL_AGE
    stale = Call.query.filter(
        Call.business_id == business_id,
        Call.status.in_(_NON_TERMINAL_STATUSES),
        Call.started_at < cutoff,
    ).all()
    if not stale:
        return
    for c in stale:
        c.status = "abandoned"
        if c.ended_at is None:
            c.ended_at = c.started_at
    db.session.commit()


def _current_business():
    if "user_id" not in session:
        return None, (jsonify({"error": "Unauthorized"}), 401)
    business = Business.query.get(session.get("business_id"))
    if not business:
        return None, (jsonify({"error": "Business not found"}), 404)
    return business, None


@calls_bp.route("", methods=["GET"])
@calls_bp.route("/", methods=["GET"])
def list_calls():
    """List calls for the logged-in business. Filter by handled_status,
    text-search caller phone or AI-extracted intent/summary."""
    business, err = _current_business()
    if err:
        return err

    _sweep_stale_calls(business.id)

    status = request.args.get("status")
    q = (request.args.get("q") or "").strip()
    limit = min(request.args.get("limit", 100, type=int), 500)
    offset = request.args.get("offset", 0, type=int)

    query = Call.query.filter_by(business_id=business.id)

    if status and status in VALID_STATUSES:
        query = query.filter(Call.handled_status == status)

    if q:
        like = f"%{q}%"
        query = query.filter(
            or_(
                Call.from_number.ilike(like),
                Call.caller_intent.ilike(like),
                Call.summary.ilike(like),
            )
        )

    total = query.count()
    rows = (
        query.order_by(Call.started_at.desc().nullslast(), Call.id.desc())
        .limit(limit)
        .offset(offset)
        .all()
    )

    return jsonify({
        "calls": [c.to_dict() for c in rows],
        "total": total,
        "limit": limit,
        "offset": offset,
        "counts_by_status": {
            s: Call.query.filter_by(business_id=business.id, handled_status=s).count()
            for s in VALID_STATUSES
        },
    }), 200


@calls_bp.route("/<int:call_id>", methods=["GET"])
def get_call(call_id):
    business, err = _current_business()
    if err:
        return err
    call = Call.query.filter_by(id=call_id, business_id=business.id).first()
    if not call:
        return jsonify({"error": "Call not found"}), 404
    return jsonify(call.to_dict()), 200


@calls_bp.route("/<int:call_id>", methods=["PATCH"])
def update_call(call_id):
    """Update follow-up state on a call. Only handled_status is editable."""
    business, err = _current_business()
    if err:
        return err
    call = Call.query.filter_by(id=call_id, business_id=business.id).first()
    if not call:
        return jsonify({"error": "Call not found"}), 404

    data = request.get_json(silent=True) or {}
    status = data.get("handled_status")
    if status is None:
        return jsonify({"error": "handled_status is required"}), 400
    if status not in VALID_STATUSES:
        return jsonify({"error": f"handled_status must be one of {sorted(VALID_STATUSES)}"}), 400

    call.handled_status = status
    call.handled_at = datetime.utcnow() if status != "new" else None
    db.session.commit()
    return jsonify(call.to_dict()), 200


@calls_bp.route("/<int:call_id>/retarget-sms", methods=["POST"])
def retarget_sms(call_id):
    """Send a follow-up SMS to the caller. Caller-supplied body is required.
    Routes through SmsService so opt-outs and rate limits are honored.
    """
    business, err = _current_business()
    if err:
        return err
    call = Call.query.filter_by(id=call_id, business_id=business.id).first()
    if not call:
        return jsonify({"error": "Call not found"}), 404

    data = request.get_json(silent=True) or {}
    body = (data.get("body") or "").strip()
    if not body:
        return jsonify({"error": "body is required"}), 400
    if len(body) > 1000:
        return jsonify({"error": "body too long (max 1000 chars)"}), 400

    if not call.from_number:
        return jsonify({"error": "Call has no caller number"}), 400

    result = SmsService.send(
        to=call.from_number,
        body=body,
        business=business,
        idempotency_key=f"retarget:{call.id}:{int(datetime.utcnow().timestamp())}",
    )

    if not result.sent:
        return jsonify({
            "sent": False,
            "reason": result.get("reason"),
        }), 200 if result.get("reason") in {"opted_out", "rate_limited", "idempotent_replay"} else 502

    # Auto-advance the lead status when the user takes action
    if call.handled_status == "new":
        call.handled_status = "called_back"
        call.handled_at = datetime.utcnow()
        db.session.commit()

    return jsonify({
        "sent": True,
        "twilio_sid": result.get("twilio_sid"),
        "call": call.to_dict(),
    }), 200
