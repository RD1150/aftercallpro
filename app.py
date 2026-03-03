from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
from pathlib import Path

# -------------------------
# PATHS
# -------------------------
ROOT_DIR = Path(__file__).resolve().parent
DIST_DIR = ROOT_DIR / "src" / "frontend" / "dist"

# -------------------------
# CREATE APP
# -------------------------
app = Flask(
    __name__,
    static_folder=str(DIST_DIR),
    static_url_path="/"
)

app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-this-in-production")

# Session cookie settings for cross-origin requests
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"
app.config["SESSION_COOKIE_HTTPONLY"] = True

# -------------------------
# DATABASE CONFIG
# -------------------------
database_url = os.environ.get("DATABASE_URL")

if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace(
        "postgres://",
        "postgresql+psycopg2://",
        1
    )

app.config["SQLALCHEMY_DATABASE_URI"] = database_url or "sqlite:///aftercallpro.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# -------------------------
# INIT EXTENSIONS
# -------------------------
from src.models.user import db

db.init_app(app)

# Create tables automatically (safe for early-stage app)
with app.app_context():
    db.create_all()

# Allow frontend cookies (for session login)
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "https://aftercallpro.onrender.com",
])

# -------------------------
# REGISTER BLUEPRINTS
# -------------------------
from src.routes.auth import auth_bp
from src.routes.payments import payments_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(payments_bp, url_prefix="/api/payments")

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "AfterCallPro"}), 200

# -------------------------
# SERVE REACT FRONTEND
# -------------------------
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(DIST_DIR / "assets", filename)

@app.route("/<path:filename>")
def serve_dist_file(filename):
    file_path = DIST_DIR / filename
    if file_path.exists():
        return send_from_directory(DIST_DIR, filename)
    # SPA fallback — let React Router handle the route
    return send_from_directory(DIST_DIR, "index.html")

@app.route("/")
def index():
    return send_from_directory(DIST_DIR, "index.html")

# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
