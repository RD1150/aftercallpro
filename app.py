# app.py  (repo root)
import os
from flask import Flask, render_template, send_from_directory, jsonify
from flask_cors import CORS

BASE_DIR = os.path.abspath(os.path.dirname(__file__))          # .../aftercallpro
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")            # .../aftercallpro/templates
STATIC_DIR    = os.path.join(BASE_DIR, "static")               # .../aftercallpro/static
ASSETS_DIR    = os.path.join(STATIC_DIR, "assets")             # .../aftercallpro/static/assets

app = Flask(
    __name__,
    static_folder=STATIC_DIR,          # we'll serve static under /assets
    static_url_path="/assets"
)
CORS(app)

# Optional: register your API blueprint if you have one
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

# Debug endpoint so we can verify files exist after deploy
@app.get("/api/debug/files")
def debug_files():
    data = {
        "templates_exists": os.path.exists(TEMPLATES_DIR),
        "static_exists": os.path.exists(STATIC_DIR),
        "assets_exists": os.path.exists(ASSETS_DIR),
        "templates_list": sorted(os.listdir(TEMPLATES_DIR)) if os.path.exists(TEMPLATES_DIR) else [],
        "assets_count": len(os.listdir(ASSETS_DIR)) if os.path.exists(ASSETS_DIR) else 0,
    }
    return jsonify(data)

# Serve assets explicitly (useful for unusual file types)
@app.route("/assets/<path:filename>")
def assets(filename: str):
    return send_from_directory(ASSETS_DIR, filename)

# SPA fallback: always return built index.html
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    return render_template("index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG") == "1")
