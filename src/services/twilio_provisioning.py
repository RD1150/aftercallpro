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
import logging

logger = logging.getLogger(__name__)


def provision_number_for_business(business, area_code: str = None) -> dict:
    """
    Purchase a new local Twilio phone number and assign it to a business.

    Configures the number's voice and SMS webhooks to point back to AfterCallPro.

    Args:
        business: Business model instance
        area_code: Optional 3-digit area code to search in (e.g. "805")

    Returns:
        dict with keys: success (bool), phone_number (str), sid (str), error (str)
    """
    try:
        import requests

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        base_url = os.getenv("APP_BASE_URL", "https://aftercallpro.onrender.com")

        if not all([account_sid, auth_token]):
            logger.warning("Twilio credentials not configured — skipping number provisioning")
            return {"success": False, "error": "Twilio credentials not configured"}

        # Use requests directly instead of the Twilio SDK — the SDK's internal
        # serialization triggers a `'latin-1' codec can't encode character` error
        # in some environments, possibly tied to billing/locale data on the
        # account. The plain REST API works fine with UTF-8.
        api_root = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}"
        auth = (account_sid, auth_token)

        # 1) Search for an available local number.
        search_params = {"VoiceEnabled": "true", "SmsEnabled": "true", "PageSize": 1}
        if area_code:
            search_params["AreaCode"] = area_code

        search_resp = requests.get(
            f"{api_root}/AvailablePhoneNumbers/US/Local.json",
            auth=auth,
            params=search_params,
            timeout=15,
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
                "SmsUrl": f"{base_url}/api/voice/sms-incoming",
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
            purchased.get("phone_number"),
            purchased.get("sid"),
            business.id,
        )

        return {
            "success": True,
            "phone_number": purchased.get("phone_number"),
            "sid": purchased.get("sid"),
        }

    except Exception as e:
        logger.error("Number provisioning failed for business %s: %s", getattr(business, 'id', '?'), e)
        return {"success": False, "error": str(e)}


def release_number(phone_number_sid: str) -> bool:
    """
    Release a Twilio number back to the pool (e.g. when a business cancels).

    Args:
        phone_number_sid: The Twilio SID of the phone number to release

    Returns:
        True if released successfully, False otherwise
    """
    try:
        from twilio.rest import Client

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")

        if not all([account_sid, auth_token]):
            return False

        client = Client(account_sid, auth_token)
        client.incoming_phone_numbers(phone_number_sid).delete()
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
        from twilio.rest import Client

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        base_url = base_url or os.getenv("APP_BASE_URL", "https://aftercallpro.onrender.com")

        if not all([account_sid, auth_token]):
            return False

        client = Client(account_sid, auth_token)
        client.incoming_phone_numbers(phone_number_sid).update(
            voice_url=f"{base_url}/api/voice/incoming",
            voice_method="POST",
            sms_url=f"{base_url}/api/voice/sms-incoming",
            sms_method="POST",
            status_callback=f"{base_url}/api/voice/status",
            status_callback_method="POST",
        )
        logger.info("Updated webhooks for number SID: %s", phone_number_sid)
        return True

    except Exception as e:
        logger.error("Failed to update webhooks for SID %s: %s", phone_number_sid, e)
        return False
