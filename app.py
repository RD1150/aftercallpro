from flask import Flask, jsonify, send_from_directory, send_file
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
    static_folder=str(DIST_DIR) if DIST_DIR.exists() else str(ROOT_DIR / "static"),
    static_url_path="/"
)

app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-this-in-production")

# Session cookie settings
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"
app.config["SESSION_COOKIE_HTTPONLY"] = True

# -------------------------
# DATABASE CONFIG
# -------------------------
database_url = os.environ.get("DATABASE_URL", "")

# Fix Render's postgres:// prefix to postgresql+psycopg2://
if database_url.startswith("postgres://"):
    database_url = "postgresql+psycopg2://" + database_url[len("postgres://"):]
elif database_url.startswith("postgresql://"):
    database_url = "postgresql+psycopg2://" + database_url[len("postgresql://"):]

app.config["SQLALCHEMY_DATABASE_URI"] = database_url or "sqlite:///aftercallpro.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# -------------------------
# INIT EXTENSIONS
# -------------------------
from src.models.user import db

db.init_app(app)

# Create tables automatically
with app.app_context():
    db.create_all()

# Allow frontend cookies
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "http://localhost:3000",
    "https://aftercallpro.onrender.com",
    "https://aftercallpro.com",
    "https://www.aftercallpro.com",
])

# -------------------------
# REGISTER BLUEPRINTS
# -------------------------
from src.routes.auth import auth_bp
from src.routes.payments import payments_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(payments_bp, url_prefix="/api/payments")

# Try to register optional blueprints
try:
    from src.routes.voice import voice_bp
    app.register_blueprint(voice_bp, url_prefix="/api/voice")
except Exception as e:
    print(f"Warning: could not load voice blueprint: {e}")

try:
    from src.routes.appointments import appointments_bp
    app.register_blueprint(appointments_bp, url_prefix="/api/appointments")
except Exception as e:
    print(f"Warning: could not load appointments blueprint: {e}")

try:
    from src.routes.business import business_bp
    app.register_blueprint(business_bp, url_prefix="/api/business")
except Exception as e:
    print(f"Warning: could not load business blueprint: {e}")

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    dist_built = DIST_DIR.exists() and (DIST_DIR / "index.html").exists()
    return jsonify({
        "status": "ok",
        "service": "AfterCallPro",
        "frontend_built": dist_built
    }), 200

# -------------------------
# SERVE REACT FRONTEND
# -------------------------
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    if DIST_DIR.exists():
        return send_from_directory(DIST_DIR / "assets", filename)
    return "Not found", 404

@app.route("/<path:filename>")
def serve_dist_file(filename):
    if DIST_DIR.exists():
        file_path = DIST_DIR / filename
        if file_path.exists() and file_path.is_file():
            return send_from_directory(DIST_DIR, filename)
        # SPA fallback — let React Router handle the route
        return send_from_directory(DIST_DIR, "index.html")
    return "App is starting up, please wait...", 503

@app.route("/")
def index():
    if DIST_DIR.exists() and (DIST_DIR / "index.html").exists():
        return send_from_directory(DIST_DIR, "index.html")
    return "<h1>AfterCallPro is starting up...</h1><p>The frontend is being built. Please refresh in 1-2 minutes.</p>", 503

# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
from flask import send_from_directory
import os

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    build_dir = os.path.join(os.getcwd(), 'src/frontend/dist')

    if path != "" and os.path.exists(os.path.join(build_dir, path)):
        return send_from_directory(build_dir, path)

    return send_from_directory(build_dir, 'index.html')
