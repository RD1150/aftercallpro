#!/usr/bin/env bash
set -e

# 1) Python deps
pip install --upgrade pip
pip install -r requirements.txt

# 2) Build React frontend (adjust path if different)
pushd src/frontend
# If you have a lockfile: use npm ci; otherwise npm install
npm ci || npm install
npm run build
popd

# 3) Copy fresh build into Flask static dir (adjust paths to match your repo)
# If your Flask static folder is src/static, do:
rm -rf src/static/*
cp -R src/frontend/dist/* src/static/
