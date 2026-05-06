"""Pipedrive integration — OAuth + person upsert with attached call note.

Mirrors the shape of hubspot_service so integration_dispatch can route
to either provider with the same push_call(integration, call) contract.

Pipedrive specifics:
- API base URL is per-company and returned by the token exchange in the
  `api_domain` field. Stash it in Integration.settings so subsequent
  calls hit the right host.
- Search by phone uses /v1/persons/search?term=<phone>&fields=phone.
- Notes are attached by setting person_id directly (no association
  objects like HubSpot).
"""

import base64
import logging
import os
import urllib.parse
from datetime import datetime, timedelta

import requests

from src.models.user import db
from src.models.integration import Integration

logger = logging.getLogger(__name__)

PROVIDER = "pipedrive"

SCOPES = ["contacts:full", "deals:full"]

AUTH_URL = "https://oauth.pipedrive.com/oauth/authorize"
TOKEN_URL = "https://oauth.pipedrive.com/oauth/token"


def _client_id():
    return os.environ.get("PIPEDRIVE_CLIENT_ID")


def _client_secret():
    return os.environ.get("PIPEDRIVE_CLIENT_SECRET")


def _redirect_uri():
    base = os.environ.get("APP_BASE_URL", "https://aftercallpro.com").rstrip("/")
    return f"{base}/api/integrations/pipedrive/callback"


def is_configured() -> bool:
    return bool(_client_id() and _client_secret())


def get_authorization_url(state: str) -> str:
    params = {
        "client_id": _client_id(),
        "redirect_uri": _redirect_uri(),
        "state": state,
        # Pipedrive's OAuth defaults to all-scopes-the-app-requests; the
        # scope param isn't always honored, but we pass it for clarity.
        "scope": " ".join(SCOPES),
    }
    return f"{AUTH_URL}?{urllib.parse.urlencode(params)}"


def _basic_auth_header() -> str:
    raw = f"{_client_id()}:{_client_secret()}".encode("utf-8")
    return "Basic " + base64.b64encode(raw).decode("ascii")


def _exchange_token(*, grant_type: str, **extra) -> dict:
    headers = {
        "Authorization": _basic_auth_header(),
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {"grant_type": grant_type, **extra}
    resp = requests.post(TOKEN_URL, data=data, headers=headers, timeout=15)
    resp.raise_for_status()
    return resp.json()


def handle_oauth_callback(business, code: str) -> Integration:
    payload = _exchange_token(
        grant_type="authorization_code",
        code=code,
        redirect_uri=_redirect_uri(),
    )

    access_token = payload["access_token"]
    refresh_token = payload.get("refresh_token")
    expires_in = int(payload.get("expires_in", 3600))
    api_domain = payload.get("api_domain")  # e.g. https://acme.pipedrive.com

    integration = Integration.query.filter_by(
        business_id=business.id, provider=PROVIDER
    ).first()
    if integration is None:
        integration = Integration(business_id=business.id, provider=PROVIDER)
        db.session.add(integration)

    integration.access_token = access_token
    integration.refresh_token = refresh_token
    integration.token_expires_at = datetime.utcnow() + timedelta(seconds=expires_in - 60)
    integration.provider_account_id = api_domain  # show in UI; api root for calls
    integration.scopes = " ".join(SCOPES)
    integration.settings = {"api_domain": api_domain}
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
        logger.error("pipedrive token refresh failed for business %s: %s", integration.business_id, e)
        integration.last_error = f"token_refresh_failed: {str(e)[:200]}"
        db.session.commit()
        return False

    integration.access_token = payload["access_token"]
    if payload.get("refresh_token"):
        integration.refresh_token = payload["refresh_token"]
    integration.token_expires_at = datetime.utcnow() + timedelta(
        seconds=int(payload.get("expires_in", 3600)) - 60
    )
    # api_domain can change if the user moves company plan — refresh stash
    if payload.get("api_domain"):
        s = dict(integration.settings or {})
        s["api_domain"] = payload["api_domain"]
        integration.settings = s
    db.session.commit()
    return True


def _ensure_fresh(integration: Integration) -> bool:
    if not integration.access_token:
        return False
    if integration.token_expires_at and integration.token_expires_at <= datetime.utcnow():
        return _refresh_access_token(integration)
    return True


def _api_base(integration: Integration) -> str:
    return ((integration.settings or {}).get("api_domain")
            or "https://api.pipedrive.com").rstrip("/")


def _auth_headers(integration: Integration) -> dict:
    return {"Authorization": f"Bearer {integration.access_token}"}


def disconnect(integration: Integration) -> None:
    db.session.delete(integration)
    db.session.commit()


# ----- Person + note push --------------------------------------------------


def _search_person_by_phone(integration: Integration, phone: str):
    try:
        resp = requests.get(
            f"{_api_base(integration)}/v1/persons/search",
            headers=_auth_headers(integration),
            params={"term": phone, "fields": "phone", "exact_match": "true", "limit": 1},
            timeout=15,
        )
        if not resp.ok:
            logger.warning("pipedrive person search failed: %s %s", resp.status_code, resp.text[:200])
            return None
        items = (resp.json().get("data") or {}).get("items") or []
        return items[0]["item"] if items else None
    except Exception as e:
        logger.warning("pipedrive person search error: %s", e)
        return None


def _upsert_person(integration: Integration, *, phone: str, name: str = None) -> int:
    existing = _search_person_by_phone(integration, phone)
    if existing:
        return existing.get("id")

    body = {
        "name": name or f"Caller {phone}",
        "phone": [{"value": phone, "primary": True, "label": "mobile"}],
    }
    try:
        resp = requests.post(
            f"{_api_base(integration)}/v1/persons",
            headers={**_auth_headers(integration), "Content-Type": "application/json"},
            json=body,
            timeout=15,
        )
        if not resp.ok:
            logger.warning("pipedrive person create failed: %s %s", resp.status_code, resp.text[:200])
            return None
        return resp.json().get("data", {}).get("id")
    except Exception as e:
        logger.warning("pipedrive person create error: %s", e)
        return None


def _create_note(integration: Integration, *, person_id: int, body: str) -> bool:
    try:
        resp = requests.post(
            f"{_api_base(integration)}/v1/notes",
            headers={**_auth_headers(integration), "Content-Type": "application/json"},
            json={"content": body, "person_id": person_id},
            timeout=15,
        )
        if not resp.ok:
            logger.warning("pipedrive note create failed: %s %s", resp.status_code, resp.text[:200])
            return False
        return True
    except Exception as e:
        logger.warning("pipedrive note create error: %s", e)
        return False


def push_call(integration: Integration, call) -> dict:
    if not _ensure_fresh(integration):
        return {"pushed": False, "reason": "no_valid_token"}

    if not call.from_number:
        return {"pushed": False, "reason": "missing_phone"}

    person_id = _upsert_person(integration, phone=call.from_number)
    if not person_id:
        integration.last_error = "person_upsert_failed"
        integration.last_sync_at = datetime.utcnow()
        db.session.commit()
        return {"pushed": False, "reason": "person_upsert_failed"}

    note_lines = [
        f"AfterCallPro AI handled an inbound call ({(call.duration or 0)}s).",
    ]
    if call.caller_intent:
        note_lines.append(f"Intent: {call.caller_intent}")
    if call.summary:
        note_lines.append(f"Summary: {call.summary}")
    if call.appointment_scheduled:
        note_lines.append("Appointment booked on the call.")
    note_body = "\n\n".join(note_lines)

    note_ok = _create_note(integration, person_id=person_id, body=note_body)

    integration.last_sync_at = datetime.utcnow()
    integration.last_error = None if note_ok else "note_create_failed"
    db.session.commit()
    return {"pushed": True, "person_id": person_id, "note_attached": note_ok}
