from flask import Flask, render_template
import os

app = Flask(
    __name__,
    template_folder="backend/templates",
    static_folder="backend/templates/assets"
)

@app.route("/health")
def health():
    return "OK", 200

# Serve React SPA
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    return render_template("index.html")
