#!/usr/bin/env bash
set -euo pipefail

export PIP_DISABLE_PIP_VERSION_CHECK=1
export PYTHONUNBUFFERED=1
export NPM_CONFIG_FUND=false
export CI=true

echo "--- Python deps ---"
pip install -r requirements.txt

echo "--- Frontend build (Vite) ---"
pushd src/frontend >/dev/null
npm install --no-audit --loglevel=warn
npm run build
popd >/dev/null

echo "--- Prepare Flask static ---"
rm -rf static
mkdir -p static

# Copy ALL Vite output directly
cp -R src/frontend/dist/* static/

echo "--- Build complete ---"
