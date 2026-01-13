from flask import Flask, render_template, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# ROOT ROUTE — FRONTEND
# -------------------------
@app.route("/")
def home():
    """
    Serve the AfterCallPro landing page from /templates/index.html
    """
    return render_template("index.html")


# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "AfterCallPro"}), 200


# -------------------------
# FALLBACK (optional)
# -------------------------
@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "message": "AfterCallPro is running. Page not found."
    }), 404


# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
