"""Twilio webhook signature validation.

Twilio signs every webhook with HMAC-SHA1 over (URL + sorted POST params) keyed
by the account auth token. We verify that signature before letting any handler
run, so an attacker can't spoof inbound calls or SMS and burn AI / telephony
spend.

Behavior:
  - Production (FLASK_ENV=production) with TWILIO_AUTH_TOKEN set: fail closed (403).
  - Production without TWILIO_AUTH_TOKEN: fail closed; misconfiguration is a bug.
  - Non-production: log a warning and pass through, so local Twilio CLI / curl
    testing keeps working.
"""

import logging
import os
from functools import wraps

from flask import request, abort
from twilio.request_validator import RequestValidator

logger = logging.getLogger(__name__)


def _is_production() -> bool:
    return os.environ.get("FLASK_ENV") == "production"


def _candidate_urls() -> list:
    """Return every plausible URL Twilio might have signed, in priority order.

    Render terminates TLS upstream and may rewrite Host headers when the
    request was issued against the *.onrender.com alias vs the custom
    domain. Twilio signs the EXACT URL it called, so any host/proto/path
    mismatch produces a signature failure. We try multiple candidates
    and accept if any match.
    """
    candidates = []

    proto = request.headers.get("X-Forwarded-Proto") or request.scheme
    forwarded_host = request.headers.get("X-Forwarded-Host")
    host = request.host
    path_and_query = request.full_path if request.query_string else request.path
    if path_and_query.endswith("?"):
        path_and_query = path_and_query[:-1]

    # Primary: what Flask thinks the request was, with proto fixed.
    candidates.append(f"{proto}://{host}{path_and_query}")

    # If a proxy injected X-Forwarded-Host different from request.host, try that too.
    if forwarded_host and forwarded_host != host:
        candidates.append(f"{proto}://{forwarded_host}{path_and_query}")

    # Final fallback: APP_BASE_URL is what we want to be canonical. Useful if a
    # proxy mangles host headers.
    base = (os.environ.get("APP_BASE_URL") or "").rstrip("/")
    if base:
        candidates.append(f"{base}{path_and_query}")

    # Also try the *.onrender.com host directly — Twilio webhooks have
    # historically been configured against that alias for this app.
    onrender_host = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
    if onrender_host:
        candidates.append(f"https://{onrender_host}{path_and_query}")

    # Dedupe while preserving order.
    seen = set()
    unique = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            unique.append(c)
    return unique


def twilio_webhook(f):
    """Decorator: validate Twilio's X-Twilio-Signature before the handler runs."""

    @wraps(f)
    def wrapped(*args, **kwargs):
        auth_token = os.environ.get("TWILIO_AUTH_TOKEN")

        if not auth_token:
            if _is_production():
                logger.error("Twilio webhook hit but TWILIO_AUTH_TOKEN is unset — refusing")
                abort(503)
            logger.warning("TWILIO_AUTH_TOKEN unset; skipping signature check (dev only)")
            return f(*args, **kwargs)

        signature = request.headers.get("X-Twilio-Signature", "")
        validator = RequestValidator(auth_token)

        params = request.form.to_dict() if request.method == "POST" else request.args.to_dict()

        urls = _candidate_urls()
        valid = any(validator.validate(u, params, signature) for u in urls)

        if not valid:
            logger.warning(
                "Rejecting Twilio webhook: path=%s signature=%s tried=%s",
                request.path, signature[:12] + "…" if signature else "<empty>", urls,
            )
            if _is_production():
                abort(403)
            logger.warning("Twilio signature invalid (dev): %s — passing through", request.path)

        return f(*args, **kwargs)

    return wrapped
