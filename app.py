from flask import Flask, render_template
from flask_cors import CORS

app = Flask(
    __name__,
    template_folder="src/backend/templates",
)

CORS(app)

@app.route("/health")
def health():
    return "OK", 200

# React SPA catch-all
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    return render_template("index.html")
