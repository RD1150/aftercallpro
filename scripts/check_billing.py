"""Read-only: dump a business's billing state from the DB and (if reachable) Stripe.

Usage:
    PYTHONPATH=. python3 scripts/check_billing.py <email>

Prints the DB subscription fields, then — if a Stripe customer/subscription is
linked and STRIPE_SECRET_KEY is valid — asks Stripe whether that subscription is
actually live and billing. Makes NO changes. Safe to run in the Render shell.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.call import Business


def main():
    if len(sys.argv) != 2:
        print("usage: PYTHONPATH=. python3 scripts/check_billing.py <email>")
        sys.exit(2)

    email = sys.argv[1]

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)

        print("=" * 60)
        print("DATABASE (source of truth for the comp grant)")
        print("=" * 60)
        print(f"  business id            : {biz.id}")
        print(f"  email                  : {biz.email}")
        print(f"  subscription_tier      : {biz.subscription_tier}")
        print(f"  subscription_status    : {biz.subscription_status}")
        print(f"  monthly_minutes_limit  : {getattr(biz, 'monthly_minutes_limit', 'n/a')}")
        print(f"  stripe_customer_id     : {biz.stripe_customer_id or '(none)'}")
        print(f"  stripe_subscription_id : {biz.stripe_subscription_id or '(none)'}")

        # Interpretation hint from the DB alone
        comped = (getattr(biz, 'monthly_minutes_limit', 0) or 0) >= 900000
        print()
        if not biz.stripe_customer_id and not biz.stripe_subscription_id:
            print("  → No Stripe linkage. This is a pure comp grant — you are NOT billed.")
        elif comped:
            print("  → Comp-level minutes BUT a Stripe customer is still linked.")
            print("    Could be a leftover from testing, or a real sub running alongside.")
            print("    The Stripe section below settles whether money is actually moving.")
        else:
            print("  → Stripe linkage present and minutes are normal-tier — looks like a real paid sub.")

        # Now ask Stripe directly
        print()
        print("=" * 60)
        print("STRIPE (is money actually moving?)")
        print("=" * 60)

        if not biz.stripe_customer_id and not biz.stripe_subscription_id:
            print("  Skipped — nothing linked to check.")
            return

        try:
            import stripe
            key = os.getenv("STRIPE_SECRET_KEY")
            if not key:
                print("  STRIPE_SECRET_KEY not set in this environment — cannot query Stripe.")
                return
            stripe.api_key = key

            if biz.stripe_customer_id:
                cust = stripe.Customer.retrieve(biz.stripe_customer_id)
                print(f"  customer               : {cust.id}  ({cust.get('email')})")
                print(f"  customer deleted?      : {bool(cust.get('deleted'))}")

            subs = stripe.Subscription.list(customer=biz.stripe_customer_id, status="all", limit=10) \
                if biz.stripe_customer_id else None
            if subs and subs.data:
                for s in subs.data:
                    item = s["items"]["data"][0] if s["items"]["data"] else None
                    price = item["price"] if item else None
                    amount = (price["unit_amount"] / 100) if price and price.get("unit_amount") else None
                    interval = price["recurring"]["interval"] if price and price.get("recurring") else "?"
                    discounted = bool(s.get("discount"))
                    print(f"  subscription           : {s.id}")
                    print(f"    status               : {s['status']}")
                    print(f"    price                : ${amount}/{interval}" if amount is not None else "    price : (none)")
                    print(f"    has discount/coupon  : {discounted}")
                    print(f"    cancel_at_period_end : {s.get('cancel_at_period_end')}")
                print()
                live = any(s["status"] in ("active", "trialing", "past_due") for s in subs.data)
                if live:
                    print("  → VERDICT: a LIVE subscription exists — Stripe IS billing this account.")
                else:
                    print("  → VERDICT: customer exists but NO live subscription — you are NOT being billed.")
            else:
                print("  No subscriptions on this customer — NOT being billed (DB tier is just a comp label).")

        except Exception as e:
            print(f"  Stripe call failed: {e}")
            print("  (If this says 'Expired API Key', fix STRIPE_SECRET_KEY on Render first,")
            print("   then re-run. The DB section above is already accurate regardless.)")


if __name__ == "__main__":
    main()
