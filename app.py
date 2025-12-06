# src/app.py
import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

# Absolute paths regardless of where app.py lives
BASE_DIR = os.path.abspath(os.path.dirname(__file__))                 # aftercallpro/src
PROJECT_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))          # aftercallpro
DIST_DIR = os.path.join(PROJECT_ROOT, "src", "frontend", "dist")      # aftercallpro/src/frontend/dist
ASSETS_DIR = os.path.join(DIST_DIR, "assets")

app = Flask(
    __name__,
    static_folder=ASSETS_DIR,        # serve /assets/* from the dist assets dir
    static_url_path="/assets",
)
CORS(app)

# --- OPTIONAL: register your API blueprint if you have one ---
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

# Debug: confirm dist and assets actually exist on the server
@app.get("/api/debug/frontend")
def debug_frontend():
    data = {
        "DIST_DIR": DIST_DIR,
        "ASSETS_DIR": ASSETS_DIR,
        "dist_exists": os.path.exists(DIST_DIR),
        "assets_exists": os.path.exists(ASSETS_DIR),
        "assets_count": len(os.listdir(ASSETS_DIR)) if os.path.exists(ASSETS_DIR) else 0,
        "index_exists": os.path.exists(os.path.join(DIST_DIR, "index.html")),
    }
    return jsonify(data)

# Serve the built index.html for SPA routes
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    # All non-API routes should return the built index.html
    return send_from_directory(DIST_DIR, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
