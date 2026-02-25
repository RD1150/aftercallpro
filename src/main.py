import os
import sys

# Ensure project root is on Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from src.models.user import db
from src.models.call import Business, Call
from src.routes.user import user_bp
from src.routes.voice import voice_bp
from src.routes.business import business_bp
from src.routes.auth import auth_bp
from src.routes.payments import payments_bp

# Load environment variables
load_dotenv()

# -----------------------------
# Initialize Flask app
# -----------------------------

BASE_DIR = os.path.dirname(__file__)
FRONTEND_DIST = os.path.abspath(os.path.join(BASE_DIR, "frontend", "dist"))

print("📦 Serving frontend from:", FRONTEND_DIST)

app = Flask(
    __name__,
    static_folder=FRONTEND_DIST,
    static_url_path="/"
)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-me-in-production")
app.config["SESSION_COOKIE_SECURE"] = False  # Set True after HTTPS works
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

# Enable CORS for API routes
CORS(app, resources={r"/api/*": {"origins": "*", "supports_credentials": True}})

# -----------------------------
# DATABASE CONFIG (PRODUCTION SAFE)
# -----------------------------

database_url = os.getenv("DATABASE_URL")

if not database_url:
    raise RuntimeError("DATABASE_URL environment variable is not set.")

# Render provides postgres:// but SQLAlchemy needs postgresql://
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Create tables if they don't exist
with app.app_context():
    db.create_all()

    if Business.query.count() == 0:
        demo_business = Business(
            name="Demo Business",
            phone_number="+1234567890",
            email="demo@example.com",
            greeting_message="Thank you for calling Demo Business. Our AI assistant is here to help you 24/7.",
            subscription_tier="pro",
            monthly_minutes_limit=2000,
        )
        db.session.add(demo_business)
        db.session.commit()
        print("✅ Demo business created successfully!")

# -----------------------------
# REGISTER BLUEPRINTS
# -----------------------------

app.register_blueprint(user_bp, url_prefix="/api")
app.register_blueprint(voice_bp, url_prefix="/api/voice")
app.register_blueprint(business_bp, url_prefix="/api")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(payments_bp, url_prefix="/api/payments")

# -----------------------------
# SERVE FRONTEND (React Build)
# -----------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
