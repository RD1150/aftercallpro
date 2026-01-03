from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder="templates", static_folder="static")

@app.route("/health")
def health():
    return "OK"

@app.route("/assets/<path:filename>")
def assets(filename):
    return send_from_directory("static/assets", filename)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    return render_template("index.html")
