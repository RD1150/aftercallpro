from flask import Flask, send_from_directory
import os

app = Flask(
    __name__,
    static_folder="src/frontend/dist",
    static_url_path=""
)

@app.route("/health")
def health():
    return "OK", 200

# Serve React app
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    dist_dir = app.static_folder

    if path != "" and os.path.exists(os.path.join(dist_dir, path)):
        return send_from_directory(dist_dir, path)

    return send_from_directory(dist_dir, "index.html")
