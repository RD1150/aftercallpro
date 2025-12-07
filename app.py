from flask import Flask, render_template, send_from_directory
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

# Root route → serve index.html
@app.route("/")
def serve():
    return render_template("index.html")

# Health check route (Render uses this sometimes)
@app.route("/health")
def health():
    return "OK", 200

# Serve static files
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(os.path.join(app.root_path, "static"), filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
