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
from src.services import hubspot_service, pipedrive_service, webhook_service

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
    # Pull the webhook URL into the public dict so the frontend can show
    # masked-but-recognizable info on the connected card.
    payload = []
    for r in rows:
        d = r.to_public_dict()
        if r.provider == webhook_service.PROVIDER and r.settings:
            d["url"] = r.settings.get("url")
            d["has_secret"] = bool(r.access_token)
        payload.append(d)

    return jsonify({
        "integrations": payload,
        "available": {
            "hubspot": hubspot_service.is_configured(),
            "pipedrive": pipedrive_service.is_configured(),
            "webhook": True,
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


# --- Pipedrive -------------------------------------------------------------


@integrations_bp.route("/pipedrive/connect", methods=["GET"])
def pipedrive_connect():
    business, err = _current_business()
    if err:
        return err
    if not pipedrive_service.is_configured():
        return jsonify({"error": "Pipedrive is not configured on this server."}), 503

    state_token = secrets.token_urlsafe(16)
    session["pipedrive_oauth_state"] = state_token
    session["pipedrive_oauth_business_id"] = business.id
    auth_url = pipedrive_service.get_authorization_url(state=state_token)
    return jsonify({"authorization_url": auth_url}), 200


@integrations_bp.route("/pipedrive/callback", methods=["GET"])
def pipedrive_callback():
    expected_state = session.pop("pipedrive_oauth_state", None)
    business_id = session.pop("pipedrive_oauth_business_id", None)
    state = request.args.get("state")
    code = request.args.get("code")
    err = request.args.get("error")

    if err:
        return redirect(f"/integrations?pipedrive=error&reason={err}")
    if not expected_state or state != expected_state:
        return redirect("/integrations?pipedrive=error&reason=state_mismatch")
    if not code or not business_id:
        return redirect("/integrations?pipedrive=error&reason=missing_code")

    business = Business.query.get(business_id)
    if not business:
        return redirect("/integrations?pipedrive=error&reason=business_not_found")

    try:
        pipedrive_service.handle_oauth_callback(business, code)
    except Exception:
        logger.exception("pipedrive oauth callback failed")
        return redirect("/integrations?pipedrive=error&reason=oauth_failed")

    return redirect("/integrations?pipedrive=connected")


@integrations_bp.route("/pipedrive/disconnect", methods=["POST"])
def pipedrive_disconnect():
    business, err = _current_business()
    if err:
        return err
    integration = Integration.query.filter_by(
        business_id=business.id, provider=pipedrive_service.PROVIDER
    ).first()
    if integration:
        pipedrive_service.disconnect(integration)
    return jsonify({"disconnected": True}), 200


# --- Generic webhook -------------------------------------------------------


@integrations_bp.route("/webhook", methods=["POST"])
def webhook_save():
    business, err = _current_business()
    if err:
        return err
    data = request.get_json(silent=True) or {}
    url = (data.get("url") or "").strip()
    secret = (data.get("secret") or "").strip() or None
    try:
        integration = webhook_service.upsert(business, url=url, secret=secret)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    out = integration.to_public_dict()
    out["url"] = (integration.settings or {}).get("url")
    out["has_secret"] = bool(integration.access_token)
    return jsonify(out), 200


@integrations_bp.route("/webhook/test", methods=["POST"])
def webhook_test():
    business, err = _current_business()
    if err:
        return err
    integration = Integration.query.filter_by(
        business_id=business.id, provider=webhook_service.PROVIDER
    ).first()
    if not integration:
        return jsonify({"error": "Webhook not configured"}), 404
    result = webhook_service.send_test(integration)
    return jsonify(result), 200


@integrations_bp.route("/webhook", methods=["DELETE"])
def webhook_disconnect():
    business, err = _current_business()
    if err:
        return err
    integration = Integration.query.filter_by(
        business_id=business.id, provider=webhook_service.PROVIDER
    ).first()
    if integration:
        webhook_service.disconnect(integration)
    return jsonify({"disconnected": True}), 200
