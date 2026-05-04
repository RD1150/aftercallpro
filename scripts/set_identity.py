"""Set the AI's identity for a business — principal (human owner) and assistant name.

Usage:
    PYTHONPATH=. python3 scripts/set_identity.py <email> <principal_name> [assistant_name]

Examples:
    set_identity.py sold@reenadutta.com Reena Sarah
    set_identity.py sold@reenadutta.com Reena
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business


def main():
    if len(sys.argv) not in (3, 4):
        print("usage: PYTHONPATH=. python3 scripts/set_identity.py <email> <principal_name> [assistant_name]")
        sys.exit(2)

    email = sys.argv[1]
    principal = sys.argv[2]
    assistant = sys.argv[3] if len(sys.argv) == 4 else None

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)
        biz.principal_name = principal
        if assistant is not None:
            biz.assistant_name = assistant
        db.session.commit()
        print(f"updated business id={biz.id} principal='{principal}' assistant='{assistant or biz.assistant_name or ''}'")


if __name__ == "__main__":
    main()
