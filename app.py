from flask import Flask, render_template, send_from_directory
import os

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

@app.route("/")
def serve_index():
    return render_template("index.html")

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(os.path.join(app.root_path, "static/assets"), filename)

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
