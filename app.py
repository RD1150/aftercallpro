import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

# --- FRONTEND ROUTES ---
@app.route("/")
def index():
    return send_from_directory("dist", "index.html")

@app.errorhandler(404)
def not_found(e):
    return send_from_directory("dist", "index.html")

# --- API ROUTES EXAMPLE ---
@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

# Run locally
if __name__ == "__main__":
    app.run(debug=True)
