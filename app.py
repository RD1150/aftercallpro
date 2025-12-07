import os
from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="frontend/dist", template_folder="frontend/dist")
CORS(app)

# --- Serve the built Vite frontend ---
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


# --- API Routes (your real backend APIs go here) ---
@app.route("/api/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
