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


def _public_url() -> str:
    """Reconstruct the URL Twilio signed.

    Render terminates TLS upstream, so request.url is http://. Twilio signed the
    https:// URL it actually called, so we honor X-Forwarded-Proto when present.
    """
    forwarded_proto = request.headers.get("X-Forwarded-Proto")
    if forwarded_proto:
        return request.url.replace(request.scheme + "://", forwarded_proto + "://", 1)
    return request.url


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

        if not validator.validate(_public_url(), params, signature):
            if _is_production():
                logger.warning("Rejected Twilio webhook with bad signature: %s", request.path)
                abort(403)
            logger.warning("Twilio signature invalid (dev): %s — passing through", request.path)

        return f(*args, **kwargs)

    return wrapped
