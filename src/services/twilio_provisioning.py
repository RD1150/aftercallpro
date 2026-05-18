"""
Twilio Number Provisioning Service
===================================
Handles per-client Twilio number provisioning for AfterCallPro ISV compliance.

Each business that signs up gets their own dedicated local phone number.
All SMS and voice calls are routed through that number — not the global AfterCallPro number.

This satisfies Twilio's ISV/aggregator requirements:
  - Each end business has a dedicated TFN/local number
  - SMS appears to come from the business's own number
  - Opt-in references the specific business
"""

import os
import time
import logging

import requests

logger = logging.getLogger(__name__)

# How many times to retry the Twilio search+purchase on a transient failure.
MAX_PROVISION_ATTEMPTS = 3


def provision_number_for_business(business, area_code: str = None) -> dict:
    """
    Purchase a new local Twilio phone number and assign it to a business.

    Configures the number's voice and SMS webhooks to point back to AfterCallPro.
    Retries the search+purchase a few times so one transient Twilio hiccup
    doesn't leave a paying customer with no number.

    Args:
        business: Business model instance
        area_code: Optional 3-digit area code to search in (e.g. "805")

    Returns:
        dict with keys: success (bool), phone_number (str), sid (str), error (str)
    """
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    api_key_sid = os.getenv("TWILIO_API_KEY_SID")
    api_key_secret = os.getenv("TWILIO_API_KEY_SECRET")
    base_url = os.getenv("APP_BASE_URL", "https://aftercallpro.onrender.com")

    # Prefer API Key auth when both halves are present — modern Twilio accounts
    # may not expose the master Auth Token directly. Fall back to Account SID +
    # Auth Token for older setups.
    if api_key_sid and api_key_secret:
        auth = (api_key_sid, api_key_secret)
    elif account_sid and auth_token:
        auth = (account_sid, auth_token)
    else:
        logger.warning("Twilio credentials not configured — skipping number provisioning")
        return {"success": False, "error": "Twilio credentials not configured"}

    if not account_sid:
        return {"success": False, "error": "TWILIO_ACCOUNT_SID is required even when using API Keys"}

    api_root = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}"

    # Twilio's search/purchase can fail transiently — a network blip, a 5xx, or
    # a number getting taken between search and buy. Retry the whole attempt so
    # one hiccup doesn't strand a paying customer without a number (this is
    # exactly what happened to a live signup once). Search is read-only so
    # retrying is safe; the only edge case is a buy whose HTTP response is lost
    # AFTER Twilio created the number — a retry would then buy a second number.
    # That's rare, cheap (~$1/mo), and visible in the Twilio console.
    last_error = "provisioning failed"
    for attempt in range(1, MAX_PROVISION_ATTEMPTS + 1):
        try:
            result = _provision_attempt(auth, api_root, base_url, business, area_code)
            if result.get("success"):
                if attempt > 1:
                    logger.info(
                        "Provisioning succeeded on attempt %s for business %s",
                        attempt, getattr(business, "id", "?"),
                    )
                return result
            last_error = result.get("error", last_error)
        except Exception as e:
            last_error = str(e)
        logger.warning(
            "Provisioning attempt %s/%s failed for business %s: %s",
            attempt, MAX_PROVISION_ATTEMPTS, getattr(business, "id", "?"), last_error,
        )
        if attempt < MAX_PROVISION_ATTEMPTS:
            time.sleep(attempt)  # brief backoff: 1s, then 2s

    logger.error(
        "Number provisioning failed for business %s after %s attempts: %s",
        getattr(business, "id", "?"), MAX_PROVISION_ATTEMPTS, last_error,
    )
    return {"success": False, "error": last_error}


def _provision_attempt(auth, api_root, base_url, business, area_code) -> dict:
    """One Twilio search+purchase attempt. Returns a result dict; raises on a
    network/HTTP error so the caller's retry loop can catch it."""
    # 1) Search for an available local number. Use the REST API directly, not
    # the Twilio SDK — the SDK's serialization triggers a `'latin-1' codec`
    # error in some environments. The plain REST API works fine with UTF-8.
    search_params = {"VoiceEnabled": "true", "SmsEnabled": "true", "PageSize": 1}
    if area_code:
        search_params["AreaCode"] = area_code

    search_resp = requests.get(
        f"{api_root}/AvailablePhoneNumbers/US/Local.json",
        auth=auth, params=search_params, timeout=15,
    )
    search_resp.raise_for_status()
    candidates = search_resp.json().get("available_phone_numbers", [])

    if not candidates and area_code:
        # Retry without the area-code filter.
        search_resp = requests.get(
            f"{api_root}/AvailablePhoneNumbers/US/Local.json",
            auth=auth,
            params={"VoiceEnabled": "true", "SmsEnabled": "true", "PageSize": 1},
            timeout=15,
        )
        search_resp.raise_for_status()
        candidates = search_resp.json().get("available_phone_numbers", [])

    if not candidates:
        return {"success": False, "error": "No available phone numbers found"}

    chosen_number = candidates[0]["phone_number"]

    # 2) Purchase + configure webhooks. friendly_name goes into a header
    # somewhere in Twilio's pipeline — keep it pure ASCII to be safe.
    safe_name = (business.name or "").encode("ascii", errors="replace").decode("ascii")
    friendly = f"AfterCallPro - {safe_name}"[:64]

    buy_resp = requests.post(
        f"{api_root}/IncomingPhoneNumbers.json",
        auth=auth,
        data={
            "PhoneNumber": chosen_number,
            "VoiceUrl": f"{base_url}/api/voice/incoming",
            "VoiceMethod": "POST",
            "SmsUrl": f"{base_url}/api/sms/incoming",
            "SmsMethod": "POST",
            "StatusCallback": f"{base_url}/api/voice/status",
            "StatusCallbackMethod": "POST",
            "FriendlyName": friendly,
        },
        timeout=30,
    )
    if not buy_resp.ok:
        return {"success": False, "error": f"Twilio purchase failed: {buy_resp.status_code} {buy_resp.text[:200]}"}

    purchased = buy_resp.json()
    logger.info(
        "Provisioned number %s (SID: %s) for business %s",
        purchased.get("phone_number"), purchased.get("sid"), business.id,
    )
    return {
        "success": True,
        "phone_number": purchased.get("phone_number"),
        "sid": purchased.get("sid"),
    }


def release_number(phone_number_sid: str) -> bool:
    """
    Release a Twilio number back to the pool (e.g. when a business cancels).

    Args:
        phone_number_sid: The Twilio SID of the phone number to release

    Returns:
        True if released successfully, False otherwise
    """
    try:
        import requests

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        api_key_sid = os.getenv("TWILIO_API_KEY_SID")
        api_key_secret = os.getenv("TWILIO_API_KEY_SECRET")

        if api_key_sid and api_key_secret:
            auth = (api_key_sid, api_key_secret)
        elif account_sid and auth_token:
            auth = (account_sid, auth_token)
        else:
            logger.warning("Twilio credentials not configured — cannot release number")
            return False
        if not account_sid:
            logger.error("TWILIO_ACCOUNT_SID is required to release a number")
            return False

        # REST API directly, not the Twilio SDK — the SDK triggers a 'latin-1'
        # codec error in this environment (see provision_number_for_business).
        resp = requests.delete(
            f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}"
            f"/IncomingPhoneNumbers/{phone_number_sid}.json",
            auth=auth,
            timeout=15,
        )
        if not resp.ok:
            logger.error(
                "Failed to release number SID %s: %s %s",
                phone_number_sid, resp.status_code, resp.text[:200],
            )
            return False
        logger.info("Released Twilio number SID: %s", phone_number_sid)
        return True

    except Exception as e:
        logger.error("Failed to release number SID %s: %s", phone_number_sid, e)
        return False


def update_number_webhooks(phone_number_sid: str, base_url: str = None) -> bool:
    """
    Update the webhooks on an existing provisioned number.
    Useful when the app URL changes (e.g. custom domain goes live).

    Args:
        phone_number_sid: The Twilio SID of the phone number
        base_url: New base URL (defaults to APP_BASE_URL env var)

    Returns:
        True if updated successfully, False otherwise
    """
    try:
        import requests

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        api_key_sid = os.getenv("TWILIO_API_KEY_SID")
        api_key_secret = os.getenv("TWILIO_API_KEY_SECRET")
        base_url = base_url or os.getenv("APP_BASE_URL", "https://aftercallpro.onrender.com")

        if api_key_sid and api_key_secret:
            auth = (api_key_sid, api_key_secret)
        elif account_sid and auth_token:
            auth = (account_sid, auth_token)
        else:
            logger.warning("Twilio credentials not configured — cannot update webhooks")
            return False
        if not account_sid:
            logger.error("TWILIO_ACCOUNT_SID is required to update webhooks")
            return False

        # REST API directly, not the Twilio SDK — the SDK triggers a 'latin-1'
        # codec error in this environment (see provision_number_for_business).
        resp = requests.post(
            f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}"
            f"/IncomingPhoneNumbers/{phone_number_sid}.json",
            auth=auth,
            data={
                "VoiceUrl": f"{base_url}/api/voice/incoming",
                "VoiceMethod": "POST",
                "SmsUrl": f"{base_url}/api/sms/incoming",
                "SmsMethod": "POST",
                "StatusCallback": f"{base_url}/api/voice/status",
                "StatusCallbackMethod": "POST",
            },
            timeout=30,
        )
        if not resp.ok:
            logger.error(
                "Failed to update webhooks for SID %s: %s %s",
                phone_number_sid, resp.status_code, resp.text[:200],
            )
            return False
        logger.info("Updated webhooks for number SID: %s", phone_number_sid)
        return True

    except Exception as e:
        logger.error("Failed to update webhooks for SID %s: %s", phone_number_sid, e)
        return False
