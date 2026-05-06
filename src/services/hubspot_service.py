"""HubSpot integration — OAuth + contact upsert with attached call note.

Designed to be the template for future per-CRM services (Pipedrive,
Housecall Pro, etc.) — each has its own service module behind the same
shape:
    get_authorization_url(business, state) -> str
    handle_oauth_callback(business, code) -> Integration
    push_call(integration, call) -> dict   # called from voice.py
"""

import logging
import os
import urllib.parse
from datetime import datetime, timedelta

import requests

from src.models.user import db
from src.models.integration import Integration

logger = logging.getLogger(__name__)

PROVIDER = "hubspot"

# HubSpot scopes we need to create contacts and attach engagement notes.
SCOPES = ["crm.objects.contacts.read", "crm.objects.contacts.write", "oauth"]

AUTH_URL = "https://app.hubspot.com/oauth/authorize"
TOKEN_URL = "https://api.hubapi.com/oauth/v1/token"
API_BASE = "https://api.hubapi.com"


def _client_id():
    return os.environ.get("HUBSPOT_CLIENT_ID")


def _client_secret():
    return os.environ.get("HUBSPOT_CLIENT_SECRET")


def _redirect_uri():
    # Must exactly match what's configured in HubSpot app settings.
    base = os.environ.get("APP_BASE_URL", "https://aftercallpro.com").rstrip("/")
    return f"{base}/api/integrations/hubspot/callback"


def is_configured() -> bool:
    return bool(_client_id() and _client_secret())


def get_authorization_url(state: str) -> str:
    params = {
        "client_id": _client_id(),
        "redirect_uri": _redirect_uri(),
        "scope": " ".join(SCOPES),
        "state": state,
    }
    return f"{AUTH_URL}?{urllib.parse.urlencode(params)}"


def _exchange_token(*, grant_type: str, **extra) -> dict:
    data = {
        "grant_type": grant_type,
        "client_id": _client_id(),
        "client_secret": _client_secret(),
        **extra,
    }
    resp = requests.post(TOKEN_URL, data=data, timeout=15)
    resp.raise_for_status()
    return resp.json()


def handle_oauth_callback(business, code: str) -> Integration:
    """Exchange the auth code, persist (or update) the integration row."""
    payload = _exchange_token(
        grant_type="authorization_code",
        redirect_uri=_redirect_uri(),
        code=code,
    )

    access_token = payload["access_token"]
    refresh_token = payload.get("refresh_token")
    expires_in = int(payload.get("expires_in", 1800))

    # HubSpot exposes hub_id via /oauth/v1/access-tokens/<token>
    hub_id = None
    try:
        meta = requests.get(
            f"{API_BASE}/oauth/v1/access-tokens/{access_token}", timeout=15
        )
        if meta.ok:
            hub_id = str(meta.json().get("hub_id") or "") or None
    except Exception as e:
        logger.warning("hubspot meta fetch failed: %s", e)

    integration = Integration.query.filter_by(
        business_id=business.id, provider=PROVIDER
    ).first()
    if integration is None:
        integration = Integration(business_id=business.id, provider=PROVIDER)
        db.session.add(integration)

    integration.access_token = access_token
    integration.refresh_token = refresh_token
    integration.token_expires_at = datetime.utcnow() + timedelta(seconds=expires_in - 60)
    integration.provider_account_id = hub_id
    integration.scopes = " ".join(SCOPES)
    integration.enabled = True
    integration.last_error = None
    db.session.commit()
    return integration


def _refresh_access_token(integration: Integration) -> bool:
    if not integration.refresh_token:
        return False
    try:
        payload = _exchange_token(
            grant_type="refresh_token",
            refresh_token=integration.refresh_token,
        )
    except Exception as e:
        logger.error("hubspot token refresh failed for business %s: %s", integration.business_id, e)
        integration.last_error = f"token_refresh_failed: {str(e)[:200]}"
        db.session.commit()
        return False

    integration.access_token = payload["access_token"]
    if payload.get("refresh_token"):
        integration.refresh_token = payload["refresh_token"]
    integration.token_expires_at = datetime.utcnow() + timedelta(
        seconds=int(payload.get("expires_in", 1800)) - 60
    )
    db.session.commit()
    return True


def _ensure_fresh(integration: Integration) -> bool:
    if not integration.access_token:
        return False
    if integration.token_expires_at and integration.token_expires_at <= datetime.utcnow():
        return _refresh_access_token(integration)
    return True


def _auth_headers(integration: Integration) -> dict:
    return {"Authorization": f"Bearer {integration.access_token}"}


def disconnect(integration: Integration) -> None:
    """Hard delete the row. HubSpot tokens self-expire; we don't bother
    revoking on their side (they don't expose a clean revoke endpoint
    for refresh tokens)."""
    db.session.delete(integration)
    db.session.commit()


# ----- Contact + note push ------------------------------------------------


def _search_contact_by_phone(integration: Integration, phone: str):
    body = {
        "filterGroups": [
            {
                "filters": [
                    {"propertyName": "phone", "operator": "EQ", "value": phone},
                ]
            }
        ],
        "limit": 1,
        "properties": ["phone", "firstname", "lastname", "email"],
    }
    resp = requests.post(
        f"{API_BASE}/crm/v3/objects/contacts/search",
        headers={**_auth_headers(integration), "Content-Type": "application/json"},
        json=body,
        timeout=15,
    )
    if not resp.ok:
        logger.warning("hubspot contact search failed: %s %s", resp.status_code, resp.text[:200])
        return None
    results = resp.json().get("results") or []
    return results[0] if results else None


def _upsert_contact(integration: Integration, *, phone: str, intent: str = None) -> str:
    """Returns the HubSpot contact id, or None on failure."""
    existing = _search_contact_by_phone(integration, phone)
    properties = {
        "phone": phone,
        "hs_lead_status": "NEW",
    }
    if intent:
        # HubSpot allows arbitrary single-line jobtitle/notes; we use a custom
        # fallback into 'jobtitle' only if the user has nothing better — but
        # safer to put intent into the attached note instead.
        pass

    if existing:
        contact_id = existing["id"]
        try:
            r = requests.patch(
                f"{API_BASE}/crm/v3/objects/contacts/{contact_id}",
                headers={**_auth_headers(integration), "Content-Type": "application/json"},
                json={"properties": properties},
                timeout=15,
            )
            if not r.ok:
                logger.warning("hubspot contact update failed: %s %s", r.status_code, r.text[:200])
        except Exception as e:
            logger.warning("hubspot contact update error: %s", e)
        return contact_id

    try:
        r = requests.post(
            f"{API_BASE}/crm/v3/objects/contacts",
            headers={**_auth_headers(integration), "Content-Type": "application/json"},
            json={"properties": properties},
            timeout=15,
        )
        if not r.ok:
            logger.warning("hubspot contact create failed: %s %s", r.status_code, r.text[:200])
            return None
        return r.json().get("id")
    except Exception as e:
        logger.warning("hubspot contact create error: %s", e)
        return None


def _create_note(integration: Integration, *, contact_id: str, body: str) -> bool:
    payload = {
        "properties": {
            "hs_note_body": body,
            "hs_timestamp": int(datetime.utcnow().timestamp() * 1000),
        },
        "associations": [
            {
                "to": {"id": contact_id},
                "types": [
                    {
                        "associationCategory": "HUBSPOT_DEFINED",
                        # 202 = note → contact
                        "associationTypeId": 202,
                    }
                ],
            }
        ],
    }
    try:
        r = requests.post(
            f"{API_BASE}/crm/v3/objects/notes",
            headers={**_auth_headers(integration), "Content-Type": "application/json"},
            json=payload,
            timeout=15,
        )
        if not r.ok:
            logger.warning("hubspot note create failed: %s %s", r.status_code, r.text[:200])
            return False
        return True
    except Exception as e:
        logger.warning("hubspot note create error: %s", e)
        return False


def push_call(integration: Integration, call) -> dict:
    """Upsert the caller as a HubSpot contact and attach a note with the
    AI's call summary. Best-effort — failures are logged but never
    raised."""
    if not _ensure_fresh(integration):
        return {"pushed": False, "reason": "no_valid_token"}

    if not call.from_number:
        return {"pushed": False, "reason": "missing_phone"}

    contact_id = _upsert_contact(
        integration,
        phone=call.from_number,
        intent=call.caller_intent,
    )
    if not contact_id:
        integration.last_error = "contact_upsert_failed"
        integration.last_sync_at = datetime.utcnow()
        db.session.commit()
        return {"pushed": False, "reason": "contact_upsert_failed"}

    note_lines = [
        f"AfterCallPro AI handled an inbound call ({(call.duration or 0)}s).",
    ]
    if call.caller_intent:
        note_lines.append(f"Intent: {call.caller_intent}")
    if call.summary:
        note_lines.append(f"Summary: {call.summary}")
    if call.appointment_scheduled:
        note_lines.append("✅ Appointment booked on the call.")
    note_body = "\n\n".join(note_lines)

    note_ok = _create_note(integration, contact_id=contact_id, body=note_body)

    integration.last_sync_at = datetime.utcnow()
    integration.last_error = None if note_ok else "note_create_failed"
    db.session.commit()
    return {"pushed": True, "contact_id": contact_id, "note_attached": note_ok}
