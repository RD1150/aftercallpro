"""ElevenLabs text-to-speech for natural-sounding AI receptionist voice.

Generates an MP3 from a string and stashes it on disk for Twilio to <Play>.
We use /tmp because it's shared between gunicorn workers in the same container,
and audio files are short-lived (Twilio fetches them within seconds).

Requires ELEVENLABS_API_KEY. Returns None on any failure so callers can fall
back to Twilio's built-in <Say>.
"""

import logging
import os
import time
import uuid
from pathlib import Path

import requests

logger = logging.getLogger(__name__)

AUDIO_DIR = Path("/tmp/aftercallpro_audio")
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

# Sensible defaults — Rachel (warm professional female), Turbo v2.5 model
# (~250ms latency, decent quality, cheaper than the multilingual flagship).
DEFAULT_VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")
DEFAULT_MODEL = os.environ.get("ELEVENLABS_MODEL", "eleven_turbo_v2_5")
ELEVENLABS_API = "https://api.elevenlabs.io/v1"


def synthesize_to_file(text: str, voice_id: str = None) -> str | None:
    """Generate TTS audio via ElevenLabs and save to /tmp.

    Returns just the basename (e.g. `abc123.mp3`) on success, or None.
    Caller composes the public URL via `/api/voice/audio/<basename>`.
    """
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        return None
    if not text or not text.strip():
        return None

    voice_id = voice_id or DEFAULT_VOICE_ID
    try:
        resp = requests.post(
            f"{ELEVENLABS_API}/text-to-speech/{voice_id}",
            headers={
                "xi-api-key": api_key,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg",
            },
            json={
                "text": text,
                "model_id": DEFAULT_MODEL,
                "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
            },
            timeout=20,
        )
        if not resp.ok:
            logger.error("ElevenLabs synth %s: %s", resp.status_code, resp.text[:200])
            return None

        _cleanup_old_files()

        filename = f"{uuid.uuid4().hex}.mp3"
        (AUDIO_DIR / filename).write_bytes(resp.content)
        return filename
    except Exception as e:
        logger.error("ElevenLabs synth error: %s", e)
        return None


def _cleanup_old_files(max_age_seconds: int = 600):
    """Delete audio files older than max_age_seconds — called opportunistically."""
    cutoff = time.time() - max_age_seconds
    try:
        for f in AUDIO_DIR.glob("*.mp3"):
            if f.stat().st_mtime < cutoff:
                f.unlink(missing_ok=True)
    except Exception as e:
        logger.warning("audio cleanup error: %s", e)
