"""
Initialize database with tables
"""
from flask import Flask
from models import db, Conversation, Lead, Appointment, User
from config import get_config
import os

def init_database():
    """Create all database tables"""
    app = Flask(__name__)
    app.config.from_object(get_config())
    
    db.init_app(app)
    
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully!")
        
        # Print table names
        print("\nCreated tables:")
        for table in db.metadata.sorted_tables:
            print(f"  - {table.name}")

if __name__ == "__main__":
    init_database()

