"""Diagnose where the \\u20ac (euro) character is hiding before provisioning.

Usage:
    PYTHONPATH=. python3 scripts/debug_provision.py <email>
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.call import Business


def find_non_ascii(label, value):
    if value is None:
        print(f"  {label}: None")
        return
    s = str(value)
    bad = [(i, c, hex(ord(c))) for i, c in enumerate(s) if ord(c) > 127]
    if bad:
        print(f"  {label} (len={len(s)}): NON-ASCII at {bad}")
        print(f"    repr: {s!r}")
    else:
        print(f"  {label} (len={len(s)}): ASCII ok")


def main():
    if len(sys.argv) != 2:
        print("usage: PYTHONPATH=. python3 scripts/debug_provision.py <email>")
        sys.exit(2)

    email = sys.argv[1]

    print("=== ENV VARS ===")
    for k in [
        "TWILIO_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN",
        "TWILIO_PHONE_NUMBER",
        "APP_BASE_URL",
    ]:
        find_non_ascii(k, os.environ.get(k))

    print("\n=== BUSINESS RECORD ===")
    with app.app_context():
        biz = Business.query.filter_by(email=email).first()
        if not biz:
            print(f"NOT FOUND: {email}")
            return
        for attr in ["name", "phone_number", "email", "greeting_message", "sms_template", "industry", "twilio_number"]:
            find_non_ascii(f"business.{attr}", getattr(biz, attr, None))


if __name__ == "__main__":
    main()
