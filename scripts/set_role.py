"""Change a user's role.

Usage:
    PYTHONPATH=. python3 scripts/set_role.py <email> <role>

Valid roles (per User.has_permission): admin, business_owner, staff, user.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db, User


VALID_ROLES = {"admin", "business_owner", "staff", "user"}


def main():
    if len(sys.argv) != 3:
        print("usage: PYTHONPATH=. python3 scripts/set_role.py <email> <role>")
        sys.exit(2)

    email, role = sys.argv[1], sys.argv[2]
    if role not in VALID_ROLES:
        print(f"invalid role '{role}'. valid: {', '.join(sorted(VALID_ROLES))}")
        sys.exit(2)

    with app.app_context():
        u = User.query.filter_by(email=email).first()
        if not u:
            print(f"NOT FOUND: no user with email {email}")
            sys.exit(1)
        u.role = role
        db.session.commit()
        print(f"updated user id={u.id} email={email} role={role}")


if __name__ == "__main__":
    main()
