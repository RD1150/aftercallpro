from flask import Flask, render_template, send_from_directory
import os

# --- Compute absolute paths ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# --- Create Flask app with explicit absolute paths ---
app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

# --- Root route: serve index.html ---
@app.route("/")
def serve():
    return render_template("index.html")

# --- Health check for Render ---
@app.route("/health")
def health():
    return "OK", 200

# --- Static files (CSS, JS, images) ---
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(STATIC_DIR, filename)

# --- Run locally ---
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
