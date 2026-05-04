"""Test ElevenLabs synthesis directly to see why it's silently failing.

Usage:
    PYTHONPATH=. python3 scripts/test_elevenlabs.py
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import requests


def main():
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    voice_id = os.environ.get("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")
    model = os.environ.get("ELEVENLABS_MODEL", "eleven_turbo_v2_5")

    print(f"API key set: {bool(api_key)} (len={len(api_key) if api_key else 0})")
    print(f"Voice ID: {voice_id}")
    print(f"Model: {model}")

    if not api_key:
        print("FAIL: ELEVENLABS_API_KEY env var is empty")
        return

    print("\n--- testing /v1/user (skip if 401, key may not have user_read) ---")
    r = requests.get(
        "https://api.elevenlabs.io/v1/user",
        headers={"xi-api-key": api_key},
        timeout=10,
    )
    print(f"status: {r.status_code}")
    if r.ok:
        sub = r.json().get('subscription', {})
        print(f"subscription tier: {sub.get('tier')}")
        print(f"chars used / limit: {sub.get('character_count')} / {sub.get('character_limit')}")
    else:
        print(f"(skipping — key lacks user_read; not required for TTS)")

    print("\n--- testing TTS synthesis ---")
    r = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
        headers={
            "xi-api-key": api_key,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        json={
            "text": "Hello this is a test.",
            "model_id": model,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
        },
        timeout=20,
    )
    print(f"status: {r.status_code}")
    if r.ok:
        print(f"audio bytes: {len(r.content)}")
        print("OK — TTS works")
    else:
        print(f"body: {r.text[:500]}")


if __name__ == "__main__":
    main()
