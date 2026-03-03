from flask import Flask, jsonify
from flask_cors import CORS
import os

# -------------------------
# CREATE APP
# -------------------------
app = Flask(__name__)

# REQUIRED for sessions
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-this")

# Allow frontend cookies (VERY IMPORTANT for session login)
CORS(app, supports_credentials=True)

# -------------------------
# REGISTER BLUEPRINTS
# -------------------------
from src.routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix="/api/auth")

# If you later create more route files:
# from src.routes.business import business_bp
# app.register_blueprint(business_bp, url_prefix="/api/business")

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
