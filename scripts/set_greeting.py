"""Update a business's greeting message (the AI's opening line on every call).

Usage:
    PYTHONPATH=. python3 scripts/set_greeting.py <email> "<greeting>"
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business


def main():
    if len(sys.argv) != 3:
        print('usage: PYTHONPATH=. python3 scripts/set_greeting.py <email> "<greeting>"')
        sys.exit(2)

    email, greeting = sys.argv[1], sys.argv[2]

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)
        biz.greeting_message = greeting
        db.session.commit()
        print(f"updated business id={biz.id} greeting='{greeting}'")


if __name__ == "__main__":
    main()
