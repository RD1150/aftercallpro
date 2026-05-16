# Scope: AfterCallPro Website AI Assistant

A chat widget on the marketing site that answers visitor questions about
AfterCallPro (what it does, pricing, setup, integrations) and nudges toward
signup.

## Key facts about the codebase

- The marketing site is the **React SPA** in `src/frontend/src`, served by the
  catch-all route in `app.py` (`serve_react`). The Jinja templates in
  `templates/` are dead — nothing extends `base.html`.
- `AIService` (`src/services/ai_service.py`) is **not reusable** here — its
  constructor is `__init__(self, business, call)` and its prompt handles a live
  phone caller for a specific business (calendar/booking function-calling). The
  website assistant needs its own thin, stateless service.
- Backend is Flask; blueprints registered in `app.py`. Model in use:
  `gpt-4.1-mini`.

## Backend

- **`src/services/site_assistant.py`** — new `SiteAssistant` class. Static
  system prompt with curated product facts (pricing, plans, integrations,
  trial/refund terms). No DB, no tools, no function-calling. Stateless.
- **`src/routes/assistant.py`** — `assistant_bp` blueprint, `POST /chat`.
  Public, no auth. Takes `{messages: [...]}`, returns `{reply: "..."}`.
- Registered in `app.py` at `url_prefix="/api/assistant"`.

## Guardrails (it is a public, unauthenticated endpoint)

- **Rate limit** per IP — in-memory sliding window, `ASSISTANT_RATE_LIMIT_PER_HOUR`
  (default 20). Per gunicorn worker, so effective limit ~2x with 2 workers;
  acceptable for v1. Move to Redis if exactness is ever needed.
- **Input caps** — max chars per message, max history messages per request.
- Prompt scoped to AfterCallPro only; refuses off-topic / instruction-override
  attempts and points to `support@aftercallpro.com` when it cannot help.

## Frontend

- **`src/frontend/src/components/ChatWidget.jsx`** — floating bubble, expands to
  a chat panel. Inline styles in the site's navy/gold palette, matching
  `SaleBanner.jsx`. Conversation kept in component state only; nothing persisted.
- Rendered globally in `App.jsx` inside `AuthProvider`, after `<AppRoutes />`.

## Out of scope (v1)

- "Talk to a live AI receptionist" demo mode — separate, larger feature.
- Lead capture, transcript persistence, human handoff.
- Streaming responses.

## Cost

- `gpt-4.1-mini`, ~250 max output tokens/reply. Rate limit caps worst case.
  Single-digit dollars/month at early traffic.
