"""Generic outbound webhook integration.

Subscribers paste a URL (Zapier, Make.com, n8n, their own server) and we
POST a JSON payload on every captured call. Optional shared secret turns
into an HMAC-SHA256 signature so the receiver can verify the payload
came from us.

Storage on the Integration row:
- provider           = 'webhook'
- settings           = {"url": "https://...", "events": ["call.completed"]}
- access_token       = HMAC shared secret (encrypted via EncryptedText), or None
- provider_account_id = a short fingerprint of the URL for display
"""

import hashlib
import hmac
import json
import logging
from datetime import datetime
from urllib.parse import urlparse

import requests

from src.models.user import db
from src.models.integration import Integration

logger = logging.getLogger(__name__)

PROVIDER = "webhook"
DEFAULT_TIMEOUT = 8  # seconds — webhooks must be fast or we drop them
SUPPORTED_EVENTS = ["call.completed"]


def _fingerprint(url: str) -> str:
    """Short, non-secret identifier we can show in the UI ('hooks.zapier.com/...x9k2')."""
    try:
        parsed = urlparse(url)
        host = parsed.hostname or ""
        tail = (parsed.path or "")[-8:]
        return f"{host}/…{tail}" if tail else host
    except Exception:
        return url[:60]


def _validate_url(url: str) -> str:
    if not url or not isinstance(url, str):
        raise ValueError("url is required")
    parsed = urlparse(url.strip())
    if parsed.scheme not in ("http", "https"):
        raise ValueError("url must start with http:// or https://")
    if not parsed.hostname:
        raise ValueError("url is malformed")
    return url.strip()


def upsert(business, *, url: str, secret: str = None) -> Integration:
    """Create or update the webhook integration for a business."""
    url = _validate_url(url)

    integration = Integration.query.filter_by(
        business_id=business.id, provider=PROVIDER
    ).first()
    if integration is None:
        integration = Integration(business_id=business.id, provider=PROVIDER)
        db.session.add(integration)

    integration.settings = {"url": url, "events": ["call.completed"]}
    integration.provider_account_id = _fingerprint(url)
    integration.access_token = secret or None  # encrypted via EncryptedText
    integration.scopes = "call.completed"
    integration.enabled = True
    integration.last_error = None
    db.session.commit()
    return integration


def disconnect(integration: Integration) -> None:
    db.session.delete(integration)
    db.session.commit()


def _sign(secret: str, body_bytes: bytes) -> str:
    return hmac.new(
        secret.encode("utf-8"), body_bytes, hashlib.sha256
    ).hexdigest()


def _build_payload(business, call, *, event: str = "call.completed") -> dict:
    return {
        "event": event,
        "occurred_at": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "business": {
            "id": business.id,
            "name": business.name,
        },
        "call": {
            "id": call.id,
            "call_sid": call.call_sid,
            "from_number": call.from_number,
            "to_number": call.to_number,
            "duration": call.duration,
            "status": call.status,
            "started_at": call.started_at.isoformat() + "Z" if call.started_at else None,
            "ended_at": call.ended_at.isoformat() + "Z" if call.ended_at else None,
            "summary": call.summary,
            "caller_intent": call.caller_intent,
            "sentiment": call.sentiment,
            "appointment_scheduled": call.appointment_scheduled,
            "transcript": call.transcript,
        },
    }


def _post(integration: Integration, payload: dict) -> dict:
    url = (integration.settings or {}).get("url")
    if not url:
        return {"sent": False, "reason": "no_url"}

    body = json.dumps(payload, default=str).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "AfterCallPro-Webhook/1.0",
        "X-AfterCallPro-Event": payload.get("event", ""),
    }
    secret = integration.access_token
    if secret:
        headers["X-AfterCallPro-Signature"] = "sha256=" + _sign(secret, body)

    try:
        resp = requests.post(url, data=body, headers=headers, timeout=DEFAULT_TIMEOUT)
        ok = 200 <= resp.status_code < 300
        return {
            "sent": ok,
            "status_code": resp.status_code,
            "reason": None if ok else f"status_{resp.status_code}",
        }
    except requests.Timeout:
        return {"sent": False, "reason": "timeout"}
    except Exception as e:
        logger.warning("webhook post failed: %s", e)
        return {"sent": False, "reason": f"exception:{type(e).__name__}"}


def push_call(integration: Integration, call) -> dict:
    payload = _build_payload(integration.business, call, event="call.completed")
    result = _post(integration, payload)
    integration.last_sync_at = datetime.utcnow()
    integration.last_error = None if result.get("sent") else (result.get("reason") or "unknown")
    db.session.commit()
    return {"pushed": result.get("sent", False), **result}


def send_test(integration: Integration) -> dict:
    """Fire a synthetic event so the user can verify their wiring."""
    payload = {
        "event": "test.ping",
        "occurred_at": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "business": {"id": integration.business_id, "name": integration.business.name},
        "message": "AfterCallPro webhook test ping. If you see this, wiring is correct.",
    }
    return _post(integration, payload)
