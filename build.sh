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

echo "--- Prepare Flask templates/static ---"
rm -rf templates static
mkdir -p templates static/assets

# Copy Vite build output
cp -f src/frontend/dist/index.html templates/
cp -R src/frontend/dist/assets/* static/assets/

# Rewrite asset paths inside the template
sed -i 's|/assets/|/static/assets/|g' templates/index.html

echo "--- Build complete ---"
