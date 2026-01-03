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

# Serve static assets built by Vite
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# React SPA catch-all (THIS IS CORRECT — DO NOT DELETE)
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    return render_template("index.html")
