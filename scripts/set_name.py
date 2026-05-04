"""Update a business's name (used by the AI in responses)."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business


def main():
    if len(sys.argv) != 3:
        print('usage: PYTHONPATH=. python3 scripts/set_name.py <email> "<business name>"')
        sys.exit(2)

    email, name = sys.argv[1], sys.argv[2]
    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)
        biz.name = name
        db.session.commit()
        print(f"updated business id={biz.id} name='{name}'")


if __name__ == "__main__":
    main()
