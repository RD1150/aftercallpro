from flask import Flask, jsonify
from flask_cors import CORS
import os

# -------------------------
# CREATE APP
# -------------------------
app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-this")

# -------------------------
# DATABASE CONFIG
# -------------------------
database_url = os.environ.get("DATABASE_URL")

if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace(
        "postgres://",
        "postgresql+psycopg://",
        1
    )

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
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
CORS(app, supports_credentials=True)

# -------------------------
# REGISTER BLUEPRINTS
# -------------------------
from src.routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix="/api/auth")

# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "AfterCallPro"}), 200


# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
