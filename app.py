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

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/terms")
def terms():
    return render_template("terms.html")

@app.route("/sms-consent")
def sms_consent():
    return render_template("sms-consent.html")

@app.route("/assets/<path:filename>")
def serve_assets(filename):
    return send_from_directory(
        os.path.join(app.root_path, "static", "assets"),
        filename
    )

@app.route("/health")
def health():
    return "ok"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5050, debug=True)
