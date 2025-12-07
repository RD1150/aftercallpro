# app.py (minimal sanity check)
from flask import Flask, jsonify
app = Flask(__name__)

@app.get("/")
def root():
    return "AfterCallPro server is running ✅"

@app.get("/api/health")
def health():
    return jsonify(status="ok")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
