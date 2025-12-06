# app.py
import os
from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS

# Flask will serve the built frontend from these folders:
#   templates/index.html
#   static/assets/*
app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# --- OPTIONAL: Register your existing API if present ---
# These try/except blocks let this file work even if the modules don't exist yet.
# If you already have a blueprint called `api_bp` in one of these, it will be registered.
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

# --- Simple health endpoint (safe to keep) ---
@app.get("/api/health")
def health():
    return jsonify(status="ok")

# --- Serve built asset files: /assets/* maps to static/assets/* ---
@app.route("/assets/<path:filename>")
def assets(filename: str):
    return send_from_directory(os.path.join(app.static_folder, "assets"), filename)

# --- SPA fallback: any non-API route returns index.html ---
# Keep ALL of your /api/* routes defined ABOVE this handler.
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
