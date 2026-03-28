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
# Do NOT set static_folder or static_url_path — Flask's built-in static handler
# with static_url_path="/" intercepts all routes and returns 404 for React paths.
# Our serve_react catch-all below handles all static file serving instead.
app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-this-in-production")

# Session cookie settings
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"
app.config["SESSION_COOKIE_HTTPONLY"] = True

# -------------------------
# DATABASE CONFIG
# -------------------------
database_url = os.environ.get("DATABASE_URL", "")

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

with app.app_context():
    db.create_all()

# -------------------------
# CORS
# -------------------------
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

try:
    from src.routes.voice import voice_bp
    app.register_blueprint(voice_bp, url_prefix="/api/voice")
except Exception as e:
    print(f"Voice blueprint not loaded: {e}")

try:
    from src.routes.appointments import appointments_bp
    app.register_blueprint(appointments_bp, url_prefix="/api/appointments")
except Exception as e:
    print(f"Appointments blueprint not loaded: {e}")

try:
    from src.routes.business import business_bp
    app.register_blueprint(business_bp, url_prefix="/api/business")
except Exception as e:
    print(f"Business blueprint not loaded: {e}")

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    # Check DB connectivity
    db_status = "unknown"
    db_error = None
    try:
        from sqlalchemy import text
        db.session.execute(text('SELECT 1'))
        db_status = "connected"
    except Exception as e:
        db_status = "error"
        db_error = str(e)[:200]

    # Check if tables exist
    tables_exist = False
    try:
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        tables_exist = 'businesses' in inspector.get_table_names()
    except Exception:
        pass

    return jsonify({
        "status": "ok",
        "service": "AfterCallPro",
        "frontend_built": DIST_DIR.exists() and (DIST_DIR / "index.html").exists(),
        "db_status": db_status,
        "db_error": db_error,
        "tables_exist": tables_exist
    })

# -------------------------
# SERVE STATIC ASSETS
# -------------------------
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    if DIST_DIR.exists():
        return send_from_directory(str(DIST_DIR / "assets"), filename)
    return "Not found", 404

# -------------------------
# REACT SPA CATCH-ALL (MUST BE LAST)
# Returns index.html for all React Router paths. Flask's built-in static
# handler is disabled above so this is the sole handler for every non-API URL.
# -------------------------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if not DIST_DIR.exists():
        return "<h1>App is starting...</h1><p>Please refresh in 1-2 minutes.</p>", 503

    # Serve actual static files that exist in dist/ (favicon.ico, robots.txt, etc.)
    if path:
        file_path = DIST_DIR / path
        if file_path.exists() and file_path.is_file():
            return send_from_directory(str(DIST_DIR), path)

    # For all React Router paths, return index.html
    return send_from_directory(str(DIST_DIR), "index.html")

# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
