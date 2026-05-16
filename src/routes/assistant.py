"""Public website AI-assistant endpoint.

POST /api/assistant/chat — no auth, rate-limited per IP. Backs the chat widget
on the marketing site (src/frontend/src/components/ChatWidget.jsx).
"""

import logging
import os
import time
from collections import deque

from flask import Blueprint, jsonify, request

from src.services.site_assistant import (
    MAX_HISTORY_MESSAGES,
    MAX_MESSAGE_CHARS,
    SiteAssistant,
)

logger = logging.getLogger(__name__)

assistant_bp = Blueprint("assistant", __name__)

# In-memory sliding-window rate limit. This lives per gunicorn worker, so with
# 2 workers the effective cap is ~2x ASSISTANT_RATE_LIMIT_PER_HOUR — acceptable
# for v1. Switch to Redis if an exact global limit is ever needed.
RATE_LIMIT = int(os.environ.get("ASSISTANT_RATE_LIMIT_PER_HOUR", "20"))
WINDOW_SECONDS = 3600
_hits = {}  # ip -> deque[timestamp]

# Lazily constructed so importing this module never requires OPENAI_API_KEY.
_assistant = None


def _get_assistant():
    global _assistant
    if _assistant is None:
        _assistant = SiteAssistant()
    return _assistant


def _client_ip():
    forwarded = request.headers.get("X-Forwarded-For", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.remote_addr or "unknown"


def _rate_limited(ip):
    now = time.time()
    hits = _hits.setdefault(ip, deque())
    while hits and hits[0] < now - WINDOW_SECONDS:
        hits.popleft()
    if len(hits) >= RATE_LIMIT:
        return True
    hits.append(now)
    return False


@assistant_bp.route("/chat", methods=["POST"])
def chat():
    ip = _client_ip()
    if _rate_limited(ip):
        return (
            jsonify(
                {
                    "error": "rate_limited",
                    "reply": "You've sent a lot of messages in a short time. "
                    "Please try again in a bit, or email support@aftercallpro.com.",
                }
            ),
            429,
        )

    data = request.get_json(silent=True) or {}
    raw_messages = data.get("messages")
    if not isinstance(raw_messages, list) or not raw_messages:
        return jsonify({"error": "bad_request"}), 400

    # Keep only well-formed user/assistant turns, cap history length and the
    # size of each message before anything reaches the model.
    messages = []
    for item in raw_messages[-MAX_HISTORY_MESSAGES:]:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        content = item.get("content")
        if role not in ("user", "assistant") or not isinstance(content, str):
            continue
        content = content.strip()
        if not content:
            continue
        messages.append({"role": role, "content": content[:MAX_MESSAGE_CHARS]})

    if not messages or messages[-1]["role"] != "user":
        return jsonify({"error": "bad_request"}), 400

    try:
        reply = _get_assistant().reply(messages)
    except Exception:
        logger.exception("site assistant failed")
        return (
            jsonify(
                {
                    "error": "server_error",
                    "reply": "Sorry — I'm having trouble right now. "
                    "Please email support@aftercallpro.com and we'll help.",
                }
            ),
            502,
        )

    return jsonify({"reply": reply})
