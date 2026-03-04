#!/usr/bin/env bash
set -e

echo "=== STEP 1: Python dependencies ==="
pip install -r requirements.txt

echo "=== STEP 2: Check Node/npm availability ==="
which node || echo "node not found"
which npm || echo "npm not found"
node --version || true
npm --version || true

echo "=== STEP 3: Install frontend dependencies ==="
cd src/frontend
npm install --prefer-offline || npm install

echo "=== STEP 4: Build React frontend ==="
npm run build

echo "=== STEP 5: Verify build output ==="
if [ -f "dist/index.html" ]; then
    echo "SUCCESS: dist/index.html exists"
    ls -la dist/
else
    echo "ERROR: dist/index.html not found!"
    exit 1
fi

cd ../..
echo "=== Build complete ==="
