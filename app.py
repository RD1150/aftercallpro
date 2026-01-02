from flask import Flask, render_template, send_from_directory
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static",
)

@app.route("/health")
def health():
    return "OK", 200

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(
        os.path.join(app.static_folder, "assets"),
        filename
    )

# React SPA catch-all
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    return render_template("index.html")
