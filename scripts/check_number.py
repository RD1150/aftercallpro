"""Check how a phone number is wired up in the AfterCallPro database.

This reads the APP DATABASE (the Business table) — NOT Twilio. It tells you
whether a number is assigned to a business so inbound calls can route to it.

Usage:
    PYTHONPATH=. python3 scripts/check_number.py            # defaults to 8054109848
    PYTHONPATH=. python3 scripts/check_number.py 8054109848
"""

import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.call import Business


def digits(value: str) -> str:
    """Last 10 digits of a phone string, so +1/(parens)/spaces all match."""
    d = re.sub(r"\D", "", value or "")
    return d[-10:]


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "8054109848"
    want = digits(target)
    print(f"Looking up number ending in {want} (input: {target})\n")

    with app.app_context():
        businesses = Business.query.order_by(Business.id).all()
        if not businesses:
            print("(no businesses in the database)")
            return

        matches = [
            b for b in businesses
            if digits(b.twilio_number) == want or digits(b.phone_number) == want
        ]

        if not matches:
            print(f"NOT FOUND — no business has {want} as twilio_number or phone_number.")
            print("Inbound calls to this number will hit the 'not configured' message.\n")
            print("All businesses on file:")
            for b in businesses:
                print(f"  id={b.id}  {b.name!r}  twilio_number={b.twilio_number}  phone_number={b.phone_number}")
            return

        for b in matches:
            role = []
            if digits(b.twilio_number) == want:
                role.append("twilio_number (the number callers dial)")
            if digits(b.phone_number) == want:
                role.append("phone_number (the business's own contact number)")
            print(f"FOUND on business id={b.id}: {b.name!r}")
            print(f"  matched as: {', '.join(role)}")
            print(f"  twilio_number           : {b.twilio_number}")
            print(f"  twilio_number_sid       : {b.twilio_number_sid}")
            print(f"  twilio_number_provisioned: {getattr(b, 'twilio_number_provisioned', '(field missing)')}")
            print(f"  phone_number            : {b.phone_number}")
            print(f"  timezone                : {b.timezone}")
            print()

        # Voice routing matches on twilio_number first, then phone_number.
        routable = any(digits(b.twilio_number) == want for b in matches)
        if routable:
            print("OK — inbound calls to this number will route to the business above.")
        else:
            print("NOTE — number is only set as phone_number, not twilio_number.")
            print("Voice routing still falls back to phone_number, so calls will route,")
            print("but provisioning fields (sid, provisioned flag) won't be populated.")


if __name__ == "__main__":
    main()
