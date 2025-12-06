# src/app.py
import os
from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS

# Resolve project paths regardless of where app.py lives
BASE_DIR = os.path.abspath(os.path.dirname(__file__))          # /.../aftercallpro/src
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))   # /.../aftercallpro

TEMPLATES_DIR = os.path.join(PROJECT_ROOT, "templates")        # /.../aftercallpro/templates
STATIC_DIR    = os.path.join(PROJECT_ROOT, "static")           # /.../aftercallpro/static
ASSETS_DIR    = os.path.join(STATIC_DIR, "assets")             # /.../aftercallpro/static/assets

app = Flask(
    __name__,
    static_folder=STATIC_DIR,           # absolute path
    template_folder=TEMPLATES_DIR,      # absolute path
)
CORS(app)

# --- Optional: register your API blueprint if present ---
for dotted_path, name in [
    ("src.api", "api_bp"),
    ("api", "api_bp"),
    ("src.routes", "api_bp"),
    ("routes", "api_bp"),
]:
    try:
        mod = __import__(dotted_path, fromlist=[name])
        api_bp = getattr(mod, name)
        app.register_blueprint(api_bp, url_prefix="/api")
        break
    except Exception:
        pass

@app.get("/api/health")
def health():
    return jsonify(status="ok")

# Serve Vite-built assets at /assets/*
@app.route("/assets/<path:filename>")
def assets(filename: str):
    return send_from_directory(ASSETS_DIR, filename)

# SPA fallback: serve index.html for any non-API route
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    # render_template will use TEMPLATES_DIR
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
