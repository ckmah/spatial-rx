#!/usr/bin/env bash
# Assemble Option A GitHub Pages artifact:
#   landing  -> site/
#   Zensical -> site/docs/
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WEBSITE="${ROOT}/website"
OUT="${ROOT}/site"

rm -rf "${OUT}"
mkdir -p "${OUT}"

# Landing (Persuade)
cp -a "${WEBSITE}/landing/." "${OUT}/"
# Ensure Pages does not run Jekyll on the artifact
touch "${OUT}/.nojekyll"

# Docs (Read) — build into website/dist, then mount at /docs/
rm -rf "${WEBSITE}/dist"
(
  cd "${WEBSITE}"
  zensical build --clean
)

mkdir -p "${OUT}/docs"
cp -a "${WEBSITE}/dist/." "${OUT}/docs/"

echo "Assembled Pages site at ${OUT}"
echo "  /        -> landing"
echo "  /docs/   -> zensical"
