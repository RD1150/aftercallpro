"""Set the industry + greeting for a business.

Usage:
    PYTHONPATH=. python3 scripts/set_industry.py <email> <industry> [greeting]
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business


def main():
    if len(sys.argv) not in (3, 4):
        print("usage: PYTHONPATH=. python3 scripts/set_industry.py <email> <industry> [greeting]")
        sys.exit(2)

    email, industry = sys.argv[1], sys.argv[2]
    greeting = sys.argv[3] if len(sys.argv) == 4 else None

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)
        biz.industry = industry
        if greeting:
            biz.greeting_message = greeting
        db.session.commit()
        print(f"updated business id={biz.id}: industry='{industry}'" + (f" greeting set" if greeting else ""))


if __name__ == "__main__":
    main()
