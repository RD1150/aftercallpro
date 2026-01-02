from flask import Flask, send_from_directory
import os

app = Flask(
    __name__,
    static_folder="static",
    static_url_path=""
)

@app.route("/health")
def health():
    return "OK", 200

# React SPA catch-all
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    static_dir = app.static_folder
    file_path = os.path.join(static_dir, path)

    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_dir, path)

    return send_from_directory(static_dir, "index.html")
