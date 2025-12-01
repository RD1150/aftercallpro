# src/main.py
import os
from pathlib import Path
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

ROOT_DIR = Path(__file__).resolve().parent.parent   # repo root
DIST_DIR = ROOT_DIR / "src" / "frontend" / "dist"   # Vite build output folder

# ---------------------------------------------------------
# Flask App
# ---------------------------------------------------------

app = Flask(
    __name__,
    static_folder=str(DIST_DIR),
    static_url_path="/"
)

CORS(app)

# ---------------------------------------------------------
# API routes
# ---------------------------------------------------------

@app.get("/api/health")
def health():
    return jsonify({"ok": True}), 200

# ---------------------------------------------------------
# Frontend static + SPA fallback
# ---------------------------------------------------------

# Serve /assets/* (Vite creates this folder)
@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(DIST_DIR / "assets", filename)


# Serve any file that actually exists in /dist
@app.route("/<path:filename>")
def serve_dist_file(filename):
    file_path = DIST_DIR / filename
    if file_path.exists():
        return send_from_directory(DIST_DIR, filename)

    # Otherwise → fallback to index.html (React Router SPA)
    return send_from_directory(DIST_DIR, "index.html")


# Root path
@app.route("/")
def index():
    return send_from_directory(DIST_DIR, "index.html")


# ---------------------------------------------------------
# Local development
# ---------------------------------------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
