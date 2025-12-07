from flask import Flask, send_from_directory, render_template

app = Flask(__name__, static_folder="src/static/dist", template_folder="src/templates")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    # If asset exists, serve it
    if path and app.static_folder:
        file_path = f"{app.static_folder}/{path}"
        try:
            return send_from_directory(app.static_folder, path)
        except:
            pass

    # Else return React index.html for all routes
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
