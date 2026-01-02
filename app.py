from flask import Flask, send_from_directory
import os

app = Flask(
    __name__,
    static_folder="static",
    static_url_path=""
)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    """
    Serve the React SPA for all routes.
    """
    static_dir = app.static_folder
    file_path = os.path.join(static_dir, path)

    # Serve static files if they exist
    if path != "" and os.path.exists(file_path):
        return send_from_directory(static_dir, path)

    # Otherwise serve index.html (React Router support)
    return send_from_directory(static_dir, "index.html")


@app.route("/health")
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
