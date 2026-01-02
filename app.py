from flask import Flask, send_from_directory
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# This must point to your Vite build output
FRONTEND_DIST = os.path.join(BASE_DIR, "src/frontend/dist")

app = Flask(
    __name__,
    static_folder=FRONTEND_DIST,
    static_url_path=""
)

# ---------- API / HEALTH ----------
@app.route("/health")
def health():
    return "OK", 200


# ---------- REACT SPA CATCH-ALL ----------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    # If the file exists, serve it (JS, CSS, assets)
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(app.static_folder, path)

    # Otherwise serve React index.html
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
