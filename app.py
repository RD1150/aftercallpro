from flask import Flask, render_template, jsonify
from flask_cors import CORS
import os

# Force Flask to know exactly where static + templates live
app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)

CORS(app)

# -------------------------
# ROOT ROUTE — FRONTEND
# -------------------------
@app.route("/")
def home():
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


# ---------
