#!/usr/bin/env bash
set -e

echo "=== Installing Python dependencies ==="
pip install -r requirements.txt

echo "=== Installing Node.js frontend dependencies ==="
cd src/frontend
npm install

echo "=== Building React frontend ==="
npm run build

echo "=== Verifying build output ==="
ls -la dist/

cd ../..
echo "=== Build complete ==="
