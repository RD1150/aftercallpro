"""Audition warmer AI-receptionist voices.

Synthesizes a real AfterCallPro greeting with several candidate voices so you
can listen and pick one. Uses the SAME model + voice_settings as production
(eleven_turbo_v2_5, retuned for warmth) so what you hear is what callers hear.

Usage:
    ELEVENLABS_API_KEY=sk_... PYTHONPATH=. python3 scripts/audition_voices.py

Output: ./voice_audition/<name>.mp3 — open the folder and play them.
Once you pick one, set ELEVENLABS_VOICE_ID on Render to that voice's ID.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pathlib import Path

import requests

API = "https://api.elevenlabs.io/v1"
MODEL = os.environ.get("ELEVENLABS_MODEL", "eleven_turbo_v2_5")

# Production voice_settings — keep in sync with src/services/elevenlabs_service.py
VOICE_SETTINGS = {
    "stability": 0.4,
    "similarity_boost": 0.85,
    "style": 0.35,
    "use_speaker_boost": True,
}

# A real call's opening exchange, so you hear the voice in context.
SAMPLE_TEXT = (
    "Thanks for calling! You've reached the office after hours. "
    "I'm the virtual assistant and I'd be happy to help. "
    "Could I get your name? ... "
    "Thanks for calling, Jordan! How can I help you today?"
)

OUT_DIR = Path(__file__).resolve().parent.parent / "voice_audition"

# Label words that signal a warm, friendly, conversational voice.
WARM_WORDS = {
    "warm", "soft", "soothing", "calm", "friendly", "gentle", "pleasant",
    "approachable", "natural", "conversational", "casual", "upbeat", "cheerful",
}


def warmth_score(voice: dict) -> int:
    """Rank a voice by how warm/friendly its labels sound."""
    text = " ".join(str(v) for v in (voice.get("labels") or {}).values()).lower()
    text += " " + (voice.get("description") or "").lower()
    return sum(1 for w in WARM_WORDS if w in text)


def main():
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        print("FAIL: set ELEVENLABS_API_KEY (copy it from Render's env vars).")
        sys.exit(1)

    headers = {"xi-api-key": api_key}

    print("Fetching available voices...")
    r = requests.get(f"{API}/voices", headers=headers, timeout=15)
    if not r.ok:
        print(f"FAIL: /voices returned {r.status_code}: {r.text[:300]}")
        sys.exit(1)

    voices = r.json().get("voices", [])
    current_id = os.environ.get("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")

    # Rank premade voices by warmth; always include the current voice for A/B.
    premade = [v for v in voices if v.get("category") in ("premade", "professional", None)]
    premade.sort(key=warmth_score, reverse=True)
    candidates, seen = [], set()
    for v in premade:
        if v["voice_id"] in seen:
            continue
        candidates.append(v)
        seen.add(v["voice_id"])
        if len(candidates) >= 6:
            break
    for v in voices:  # ensure the current voice is in the lineup
        if v["voice_id"] == current_id and current_id not in seen:
            candidates.append(v)
            break

    if not candidates:
        print("No premade voices found on this account — check the ElevenLabs library.")
        sys.exit(1)

    OUT_DIR.mkdir(exist_ok=True)
    print(f"\nModel: {MODEL}   Settings: {VOICE_SETTINGS}")
    print(f"Auditioning {len(candidates)} voices -> {OUT_DIR}\n")

    for v in candidates:
        name = v.get("name", "voice")
        vid = v["voice_id"]
        labels = " ".join(str(x) for x in (v.get("labels") or {}).values())
        tag = " (CURRENT)" if vid == current_id else ""
        resp = requests.post(
            f"{API}/text-to-speech/{vid}",
            headers={**headers, "Content-Type": "application/json", "Accept": "audio/mpeg"},
            json={"text": SAMPLE_TEXT, "model_id": MODEL, "voice_settings": VOICE_SETTINGS},
            timeout=30,
        )
        if not resp.ok:
            print(f"  SKIP {name}{tag} ({vid}): {resp.status_code} {resp.text[:120]}")
            continue
        safe = "".join(c if c.isalnum() else "_" for c in name)
        path = OUT_DIR / f"{safe}.mp3"
        path.write_bytes(resp.content)
        print(f"  OK   {name}{tag}")
        print(f"       id={vid}  labels: {labels}")
        print(f"       -> {path}")

    print(f"\nDone. Play the files in {OUT_DIR}, pick a favorite, then set")
    print("ELEVENLABS_VOICE_ID on Render to that voice's id.")
    if sys.platform == "darwin":
        os.system(f"open '{OUT_DIR}'")


if __name__ == "__main__":
    main()
