"""One-shot password reset, runnable from the Render shell.

    python3 scripts/reset_password.py <email> <new_password>

Looks up the user by email and rewrites their password hash. Used when the
forgot-password flow is broken or you don't want to wait on email delivery.
"""

import os
import sys

# Allow running as `python3 scripts/reset_password.py ...` — Python adds the
# script's own dir to sys.path, not the project root, so the `app` import would
# otherwise fail.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db, User


def main():
    if len(sys.argv) != 3:
        print("usage: python3 scripts/reset_password.py <email> <new_password>")
        sys.exit(2)

    email, new_password = sys.argv[1], sys.argv[2]

    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if not user:
            print(f"NOT FOUND: no user with email {email}")
            sys.exit(1)
        user.set_password(new_password)
        db.session.commit()
        print(f"updated password for {email} (user id={user.id})")


if __name__ == "__main__":
    main()
