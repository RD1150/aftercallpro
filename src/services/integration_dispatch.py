"""Fan-out a captured call to every connected integration.

Each provider service exposes a `push_call(integration, call)` function;
this module routes by `Integration.provider`. Failures are logged on
the integration row (`last_error`) and never raised.
"""

import logging

from src.models.integration import Integration
from src.services import hubspot_service

logger = logging.getLogger(__name__)

PROVIDER_PUSH = {
    hubspot_service.PROVIDER: hubspot_service.push_call,
}


def push_call_to_integrations(business, call):
    """Push the call to every enabled integration on the business.
    Returns a list of per-provider results so callers can log them."""
    results = []
    rows = Integration.query.filter_by(business_id=business.id, enabled=True).all()
    for integration in rows:
        push_fn = PROVIDER_PUSH.get(integration.provider)
        if not push_fn:
            continue
        try:
            result = push_fn(integration, call)
            results.append({"provider": integration.provider, **result})
        except Exception as e:
            logger.exception(
                "integration push raised for provider=%s business=%s",
                integration.provider, business.id,
            )
            integration.last_error = f"push_exception: {str(e)[:200]}"
            try:
                from src.models.user import db
                db.session.commit()
            except Exception:
                pass
            results.append({"provider": integration.provider, "pushed": False, "reason": "exception"})
    return results
