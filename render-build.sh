#!/usr/bin/env bash
set -euo pipefail

# Quiet, non-interactive installs
export PIP_DISABLE_PIP_VERSION_CHECK=1
export PYTHONUNBUFFERED=1
export NPM_CONFIG_FUND=false
export CI=true

echo "--- Python deps ---"
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
elif command -v poetry >/dev/null 2>&1 && [ -f "pyproject.toml" ]; then
  poetry install --no-root --only main
fi

echo "--- Frontend build (Vite) ---"
pushd src/frontend >/dev/null
if [ -f "package-lock.json" ]; then
  npm ci --no-audit --loglevel=warn
else
  npm install --no-audit --loglevel=warn
fi
npm run build -- --sourcemap=false
popd >/dev/null

echo "--- Prepare Flask templates/static ---"
rm -rf templates static
mkdir -p templates static/assets
cp -f src/frontend/dist/index.html templates/
cp -R src/frontend/dist/assets/* static/assets/ || true

echo "--- Build complete ---"
