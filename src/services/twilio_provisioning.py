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
        from twilio.rest import Client

        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        base_url = os.getenv("APP_BASE_URL", "https://aftercallpro.onrender.com")

        if not all([account_sid, auth_token]):
            logger.warning("Twilio credentials not configured — skipping number provisioning")
            return {"success": False, "error": "Twilio credentials not configured"}

        client = Client(account_sid, auth_token)

        # Search for available local numbers
        search_kwargs = {"voice_enabled": True, "sms_enabled": True, "limit": 1}
        if area_code:
            search_kwargs["area_code"] = area_code

        available = client.available_phone_numbers("US").local.list(**search_kwargs)

        if not available:
            # Fallback: search without area code constraint
            available = client.available_phone_numbers("US").local.list(
                voice_enabled=True, sms_enabled=True, limit=1
            )

        if not available:
            return {"success": False, "error": "No available phone numbers found"}

        chosen = available[0]

        # Purchase the number and configure webhooks
        purchased = client.incoming_phone_numbers.create(
            phone_number=chosen.phone_number,
            voice_url=f"{base_url}/api/voice/incoming",
            voice_method="POST",
            sms_url=f"{base_url}/api/voice/sms-incoming",
            sms_method="POST",
            status_callback=f"{base_url}/api/voice/status",
            status_callback_method="POST",
            friendly_name=f"AfterCallPro — {business.name}",
        )

        logger.info(
            "Provisioned number %s (SID: %s) for business %s",
            purchased.phone_number,
            purchased.sid,
            business.id,
        )

        return {
            "success": True,
            "phone_number": purchased.phone_number,
            "sid": purchased.sid,
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
