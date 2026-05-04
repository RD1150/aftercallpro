"""Provision a dedicated Twilio number for an existing business.

Usage:
    PYTHONPATH=. python3 scripts/provision_number.py <email> [area_code]

Used to retro-fit a business that was created without going through the
register flow (e.g. via create_admin.py).
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db
from src.models.call import Business
from src.services.twilio_provisioning import provision_number_for_business


def main():
    if len(sys.argv) not in (2, 3):
        print("usage: PYTHONPATH=. python3 scripts/provision_number.py <email> [area_code]")
        sys.exit(2)

    email = sys.argv[1]
    area_code = sys.argv[2] if len(sys.argv) == 3 else None

    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: no business with email {email}")
            sys.exit(1)

        if biz.twilio_number and biz.twilio_number_provisioned:
            print(f"already provisioned: {biz.twilio_number} (sid={biz.twilio_number_sid})")
            return

        result = provision_number_for_business(biz, area_code=area_code)
        if not result.get("success"):
            print(f"FAILED: {result.get('error')}")
            sys.exit(1)

        biz.twilio_number = result["phone_number"]
        biz.twilio_number_sid = result["sid"]
        biz.twilio_number_provisioned = True
        db.session.commit()
        print(f"provisioned {result['phone_number']} (sid={result['sid']}) for business id={biz.id}")


if __name__ == "__main__":
    main()
