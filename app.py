# app.py  (repo root)
import os
from flask import Flask, render_template, send_from_directory, jsonify, Response
from flask_cors import CORS

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")
ASSETS_DIR = os.path.join(STATIC_DIR, "assets")

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="/assets")
CORS(app)

def snapshot():
    return {
        "cwd": os.getcwd(),
        "base_dir": BASE_DIR,
        "templates_dir": TEMPLATES_DIR,
        "static_dir": STATIC_DIR,
        "assets_dir": ASSETS_DIR,
        "templates_exists": os.path.exists(TEMPLATES_DIR),
        "static_exists": os.path.exists(STATIC_DIR),
        "assets_exists": os.path.exists(ASSETS_DIR),
        "templates_list": sorted(os.listdir(TEMPLATES_DIR)) if os.path.exists(TEMPLATES_DIR) else [],
        "assets_count": len(os.listdir(ASSETS_DIR)) if os.path.exists(ASSETS_DIR) else 0,
    }

def diag_html(msg):
    s = snapshot()
    rows = "".join(f"<li><b>{k}</b>: {s[k]}</li>" for k in s)
    return Response(f"""
      <html><head><meta charset="utf-8"><title>AfterCallPro Diagnostic</title>
      <style>body{{font-family:system-ui;background:#0b1423;color:#fff;padding:24px}}
      .card{{background:#0e1a2a;border:1px solid #243248;border-radius:16px;padding:20px;max-width:860px}}
      a{{color:#7bd7ff}}</style></head><body>
      <div class="card">
        <h1>AfterCallPro</h1><h2>Diagnostic</h2>
        <p>{msg}</p><ul>{rows}</ul>
        <p>Try: <code>/api/health</code> • <code>/api/debug/files</code> • open a known <code>/assets/…</code> file • then hard refresh.</p>
      </div></body></html>
    """, mimetype="text/html")

@app.get("/api/health")
def health():
    return jsonify(status="ok")

@app.get("/api/debug/files")
def debug_files():
    return jsonify(snapshot())

@app.route("/assets/<path:filename>")
def assets(filename: str):
    if not os.path.exists(ASSETS_DIR):
        return diag_html("No assets directory found (static/assets). Build step likely failed.")
    return send_from_directory(ASSETS_DIR, filename)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    idx = os.path.join(TEMPLATES_DIR, "index.html")
    if os.path.exists(idx):
        return render_template("index.html")
    return diag_html("templates/index.html not found. Your frontend likely didn't copy to templates/ and static/assets/ during build.")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
