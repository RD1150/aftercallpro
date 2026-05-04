"""Create or upgrade an admin user with a 'free' (high-limit) business attached.

Usage:
    PYTHONPATH=. python3 scripts/create_admin.py <email> <password> <business_name> <phone_number>

Idempotent — if the email already has a user/business, it updates them in place
instead of erroring on the unique constraint.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db, User
from src.models.call import Business


ADMIN_TIER = "admin"
ADMIN_MINUTES = 999999


def main():
    if len(sys.argv) != 5:
        print(
            "usage: PYTHONPATH=. python3 scripts/create_admin.py "
            "<email> <password> <business_name> <phone_number>"
        )
        sys.exit(2)

    email, password, business_name, phone = sys.argv[1:]

    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if user:
            user.set_password(password)
            user.role = "admin"
            print(f"updated existing user id={user.id} role=admin password reset")
        else:
            user = User(username=email, email=email, role="admin")
            user.set_password(password)
            db.session.add(user)
            db.session.flush()
            print(f"created user id={user.id}")

        biz = Business.query.filter_by(email=email).first()
        if biz:
            biz.subscription_tier = ADMIN_TIER
            biz.monthly_minutes_limit = ADMIN_MINUTES
            biz.subscription_status = "active"
            print(f"updated existing business id={biz.id} tier=admin minutes={ADMIN_MINUTES}")
        else:
            phone_clash = Business.query.filter_by(phone_number=phone).first()
            if phone_clash:
                print(f"ERROR: phone {phone} already used by business id={phone_clash.id} ({phone_clash.email})")
                sys.exit(1)
            biz = Business(
                name=business_name,
                phone_number=phone,
                email=email,
                subscription_tier=ADMIN_TIER,
                monthly_minutes_limit=ADMIN_MINUTES,
                subscription_status="active",
            )
            db.session.add(biz)
            print(f"created business name='{business_name}' phone={phone} tier=admin")

        db.session.commit()
        print(f"done. log in at /login with {email}")


if __name__ == "__main__":
    main()
