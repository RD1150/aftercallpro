"""Verify whether a given email/password actually authenticates.

Usage:
    PYTHONPATH=. python3 scripts/verify_password.py <email> <password>
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import User


def main():
    if len(sys.argv) != 3:
        print("usage: PYTHONPATH=. python3 scripts/verify_password.py <email> <password>")
        sys.exit(2)
    email, password = sys.argv[1], sys.argv[2]
    with app.app_context():
        u = User.query.filter_by(email=email).first()
        if not u:
            print(f"NOT FOUND: no user with email {email}")
            return
        ok = u.check_password(password)
        print(f"exists=True password_ok={ok} role={u.role} locked={u.is_account_locked()}")


if __name__ == "__main__":
    main()
