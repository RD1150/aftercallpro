#!/usr/bin/env bash
set -e

echo "=== Installing Python dependencies ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Frontend build ==="
cd src/frontend
npm install
npm run build

echo "=== Build complete ==="
