"""Per-business CRM integration management.

Each provider gets its own connect/callback/disconnect endpoints that
mirror the calendar OAuth pattern in src/routes/appointments.py. The
generic /api/integrations endpoint returns the connected list for the
current business.
"""

import logging
import secrets

from flask import Blueprint, jsonify, redirect, request, session

from src.models.user import db
from src.models.call import Business
from src.models.integration import Integration
from src.services import hubspot_service

logger = logging.getLogger(__name__)

integrations_bp = Blueprint("integrations", __name__)


def _current_business():
    if "user_id" not in session:
        return None, (jsonify({"error": "Unauthorized"}), 401)
    business = Business.query.get(session.get("business_id"))
    if not business:
        return None, (jsonify({"error": "Business not found"}), 404)
    return business, None


@integrations_bp.route("", methods=["GET"])
@integrations_bp.route("/", methods=["GET"])
def list_integrations():
    business, err = _current_business()
    if err:
        return err
    rows = Integration.query.filter_by(business_id=business.id).all()
    return jsonify({
        "integrations": [r.to_public_dict() for r in rows],
        "available": {
            "hubspot": hubspot_service.is_configured(),
        },
    }), 200


# --- HubSpot --------------------------------------------------------------


@integrations_bp.route("/hubspot/connect", methods=["GET"])
def hubspot_connect():
    business, err = _current_business()
    if err:
        return err
    if not hubspot_service.is_configured():
        return jsonify({"error": "HubSpot is not configured on this server."}), 503

    # Encode business_id in state and verify on callback so an attacker
    # can't redirect a victim's HubSpot account onto someone else's tenant.
    state_token = secrets.token_urlsafe(16)
    session["hubspot_oauth_state"] = state_token
    session["hubspot_oauth_business_id"] = business.id
    auth_url = hubspot_service.get_authorization_url(state=state_token)
    return jsonify({"authorization_url": auth_url}), 200


@integrations_bp.route("/hubspot/callback", methods=["GET"])
def hubspot_callback():
    expected_state = session.pop("hubspot_oauth_state", None)
    business_id = session.pop("hubspot_oauth_business_id", None)
    state = request.args.get("state")
    code = request.args.get("code")
    err = request.args.get("error")

    if err:
        return redirect(f"/integrations?hubspot=error&reason={err}")
    if not expected_state or state != expected_state:
        return redirect("/integrations?hubspot=error&reason=state_mismatch")
    if not code or not business_id:
        return redirect("/integrations?hubspot=error&reason=missing_code")

    business = Business.query.get(business_id)
    if not business:
        return redirect("/integrations?hubspot=error&reason=business_not_found")

    try:
        hubspot_service.handle_oauth_callback(business, code)
    except Exception as e:
        logger.exception("hubspot oauth callback failed")
        return redirect(f"/integrations?hubspot=error&reason=oauth_failed")

    return redirect("/integrations?hubspot=connected")


@integrations_bp.route("/hubspot/disconnect", methods=["POST"])
def hubspot_disconnect():
    business, err = _current_business()
    if err:
        return err
    integration = Integration.query.filter_by(
        business_id=business.id, provider=hubspot_service.PROVIDER
    ).first()
    if integration:
        hubspot_service.disconnect(integration)
    return jsonify({"disconnected": True}), 200
