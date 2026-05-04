"""Grant a business a free-for-life subscription at the top tier.

Usage:
    PYTHONPATH=. python3 scripts/grant_lifetime.py <email> [tier]

Sets subscription_tier (default 'elite'), maxes out monthly_minutes_limit,
sets status='active', and clears any Stripe linkage so it can't get downgraded
by a webhook. Idempotent.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business


LIFETIME_MINUTES = 999999


def main():
    if len(sys.argv) not in (2, 3):
        print("usage: PYTHONPATH=. python3 scripts/grant_lifetime.py <email> [tier]")
        sys.exit(2)

    email = sys.argv[1]
    tier = sys.argv[2] if len(sys.argv) == 3 else "elite"

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)

        biz.subscription_tier = tier
        biz.subscription_status = "active"
        biz.monthly_minutes_limit = LIFETIME_MINUTES
        biz.stripe_customer_id = None
        biz.stripe_subscription_id = None
        db.session.commit()
        print(
            f"granted lifetime: business id={biz.id} email={email} "
            f"tier={tier} minutes={LIFETIME_MINUTES} status=active"
        )


if __name__ == "__main__":
    main()
