"""List all users in the database — useful for confirming an account exists."""

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
