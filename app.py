from flask import Flask, render_template, jsonify, send_from_directory
from flask_cors import CORS
import os

# -------------------------
# APP SETUP
# -------------------------
app = Flask(__name__)
CORS(app)

# -------------------------
# WEBSITE ROUTES
# -------------------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/features")
def features():
    return render_template("features.html")

@app.route("/pricing")
def pricing():
    return render_template("pricing.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")


# -------------------------
# LOGO ROUTE (FORCE SERVE)
# -------------------------
@app.route("/logo.png")
def logo():
    return send_from_directory("static", "logo.png")


# -------------------------
# HEALTH CHECK
# -------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok", "service": "AfterCallPro"}), 200


# -------------------------
# 404 HANDLER (REAL WEBSITE VERSION)
# -------------------------
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html"), 404


# -------------------------
# START SERVER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
