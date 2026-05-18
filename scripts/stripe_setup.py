#!/usr/bin/env python3
"""
stripe_setup.py — one-shot AfterCallPro Stripe setup.

Creates everything AfterCallPro's billing code needs in a Stripe account:
two products, four prices, two coupons, and one webhook endpoint. Intended
to run against the MindRocket account (see the mindrocket-stripe-account
note) — once in TEST mode as a dry run, then in LIVE mode once the business
is verified for live payments.

Usage:
    STRIPE_SECRET_KEY=sk_test_xxx python scripts/stripe_setup.py   # dry run
    STRIPE_SECRET_KEY=sk_live_xxx python scripts/stripe_setup.py   # real

The secret key is read from the environment and never printed. The script
prints the resulting price IDs, coupon IDs, and webhook signing secret —
paste those back so the app code and Render env vars can be wired up.

Safe to re-run: existing products / prices / coupons / webhook are detected
and reused rather than duplicated.
"""
import os
import sys

try:
    import stripe
except ImportError:
    sys.exit("The 'stripe' package is not installed. Run:  pip install stripe")

# Where the AfterCallPro Flask app receives Stripe webhooks. Override with
# ACP_WEBHOOK_URL if the production domain differs.
WEBHOOK_URL = os.getenv("ACP_WEBHOOK_URL", "https://aftercallpro.com/api/payments/webhook")
WEBHOOK_EVENTS = [
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.payment_failed",
]

# Amounts in cents — must match SUBSCRIPTION_PLANS in src/routes/payments.py.
PLANS = [
    {"key": "core",  "name": "AfterCallPro Core",
     "description": "24/7 AI call answering — 1,500 AI minutes per month.",
     "monthly": 9900,  "yearly": 99000},
    {"key": "elite", "name": "AfterCallPro Elite",
     "description": "24/7 AI call answering — 5,000 AI minutes per month.",
     "monthly": 29700, "yearly": 297000},
]

COUPONS = [
    {"id": "FOUNDING50",   "name": "Founding Member — 50% off for life",
     "duration": "forever"},
    {"id": "FIRSTMONTH50", "name": "Welcome — 50% off first month",
     "duration": "once"},
]


def get_or_create_product(plan):
    """Find a product by name (idempotent) or create it."""
    for p in stripe.Product.list(limit=100, active=True).auto_paging_iter():
        if p.name == plan["name"]:
            print(f"  · product exists: {plan['name']} ({p.id})")
            return p
    p = stripe.Product.create(
        name=plan["name"],
        description=plan["description"],
        metadata={"app": "aftercallpro", "plan": plan["key"]},
    )
    print(f"  + product created: {plan['name']} ({p.id})")
    return p


def get_or_create_price(product, plan, interval, amount):
    """Find a recurring price matching interval + amount, else create one."""
    for pr in stripe.Price.list(product=product.id, active=True, limit=100).auto_paging_iter():
        rec = getattr(pr, "recurring", None)
        if (getattr(rec, "interval", None) == interval
                and pr.unit_amount == amount and pr.currency == "usd"):
            print(f"    · price exists: {interval} ${amount / 100:.0f} ({pr.id})")
            return pr
    pr = stripe.Price.create(
        product=product.id,
        unit_amount=amount,
        currency="usd",
        recurring={"interval": interval},
        metadata={"app": "aftercallpro", "plan": plan["key"], "billing": interval},
    )
    print(f"    + price created: {interval} ${amount / 100:.0f} ({pr.id})")
    return pr


def get_or_create_coupon(spec):
    try:
        stripe.Coupon.retrieve(spec["id"])
        print(f"  · coupon exists: {spec['id']}")
        return
    except stripe.error.InvalidRequestError:
        pass
    stripe.Coupon.create(
        id=spec["id"],
        name=spec["name"],
        percent_off=50,
        duration=spec["duration"],
        metadata={"app": "aftercallpro"},
    )
    print(f"  + coupon created: {spec['id']} (50% off, {spec['duration']})")


def get_or_create_webhook():
    """Returns (endpoint, signing_secret). Secret is only available on a
    freshly created endpoint — None if the endpoint already existed."""
    for w in stripe.WebhookEndpoint.list(limit=100).auto_paging_iter():
        if w.url == WEBHOOK_URL:
            print(f"  · webhook exists: {w.id}")
            return w, None
    w = stripe.WebhookEndpoint.create(
        url=WEBHOOK_URL,
        enabled_events=WEBHOOK_EVENTS,
        description="AfterCallPro subscription lifecycle",
    )
    print(f"  + webhook created: {w.id}")
    return w, getattr(w, "secret", None)


def main():
    key = os.getenv("STRIPE_SECRET_KEY")
    if not key:
        sys.exit("Set STRIPE_SECRET_KEY in the environment first.")
    stripe.api_key = key
    mode = "LIVE" if key.startswith("sk_live_") else "TEST"

    acct = stripe.Account.retrieve()
    # Stripe response objects don't support .get() — use getattr (their
    # __getattr__ resolves real fields; missing ones fall back to default).
    acct_id = getattr(acct, "id", "?")
    bp = getattr(acct, "business_profile", None)
    name = getattr(bp, "name", None) or getattr(acct, "email", None) or "?"
    print(f"\n=== AfterCallPro Stripe setup — {mode} MODE ===")
    print(f"Account: {acct_id}  ({name})\n")

    # The LIVE run asks for confirmation interactively. Set STRIPE_SETUP_CONFIRM=yes
    # to skip the prompt when running unattended.
    if mode == "LIVE" and os.getenv("STRIPE_SETUP_CONFIRM", "").strip().lower() != "yes":
        confirm = input("This creates LIVE products/prices/coupons/webhook. Type 'yes' to continue: ")
        if confirm.strip().lower() != "yes":
            sys.exit("Aborted.")

    print("Products & prices:")
    price_ids = {}
    for plan in PLANS:
        product = get_or_create_product(plan)
        m = get_or_create_price(product, plan, "month", plan["monthly"])
        y = get_or_create_price(product, plan, "year", plan["yearly"])
        price_ids[plan["key"]] = {"monthly": m.id, "yearly": y.id}

    print("\nCoupons:")
    for spec in COUPONS:
        get_or_create_coupon(spec)

    print("\nWebhook:")
    webhook, secret = get_or_create_webhook()

    # Write full results — including the webhook signing secret — to a
    # gitignored file, so secrets never land in stdout / logs / chat.
    result_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".stripe-setup-result.txt")
    secret_line = secret or (
        f"(endpoint already existed — reveal it in Stripe → Developers "
        f"→ Webhooks → {webhook.id})"
    )
    with open(result_path, "w") as f:
        f.write(
            f"AfterCallPro Stripe setup — {mode} mode\n"
            f"Account: {acct_id}  ({name})\n\n"
            f"PRICE IDS:\n"
            f"  core  monthly: {price_ids['core']['monthly']}\n"
            f"  core  yearly:  {price_ids['core']['yearly']}\n"
            f"  elite monthly: {price_ids['elite']['monthly']}\n"
            f"  elite yearly:  {price_ids['elite']['yearly']}\n\n"
            f"RENDER ENV VARS (aftercallpro service):\n"
            f"  STRIPE_SECRET_KEY           = (the {mode.lower()} secret key you used)\n"
            f"  STRIPE_WEBHOOK_SECRET       = {secret_line}\n"
            f"  STRIPE_FOUNDING_COUPON_ID   = FOUNDING50\n"
            f"  STRIPE_FIRSTMONTH_COUPON_ID = FIRSTMONTH50\n"
            f"  VITE_STRIPE_PUBLISHABLE_KEY = (matching pk_ key — Stripe → Developers → API keys)\n\n"
            f"Webhook endpoint: {webhook.id} -> {WEBHOOK_URL}\n"
        )

    # stdout: non-secret summary only (price IDs are not secret).
    print("\n" + "=" * 62)
    print("Done. Price IDs (not secret — safe to share):")
    print(f"  core  monthly: {price_ids['core']['monthly']}")
    print(f"  core  yearly:  {price_ids['core']['yearly']}")
    print(f"  elite monthly: {price_ids['elite']['monthly']}")
    print(f"  elite yearly:  {price_ids['elite']['yearly']}")
    print("\nFull results + webhook signing secret + Render env vars written to:")
    print(f"  {result_path}")
    print("(gitignored — open it for the values to paste into Render)")
    print("=" * 62)


if __name__ == "__main__":
    main()
