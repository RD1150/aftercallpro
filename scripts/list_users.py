"""List all users in the database — useful for confirming an account exists."""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from src.models.user import db, User


def main():
    with app.app_context():
        users = User.query.order_by(User.id).all()
        if not users:
            print("(no users)")
            return
        for u in users:
            print(f"{u.id}\t{u.email}\t{u.username}")


if __name__ == "__main__":
    main()
