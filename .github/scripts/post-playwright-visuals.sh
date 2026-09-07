#!/usr/bin/env bash
# Post / update a sticky PR comment with Playwright snapshot PNGs + videos via gh --attach.
# Requires GitHub CLI >= 2.99.0 (repeatable --attach).
set -euo pipefail

MARKER="<!-- playwright-visuals -->"
REPO="${GITHUB_REPOSITORY:-}"
PR_NUMBER="${PR_NUMBER:-${1:-}}"
# Repo root: script lives in .github/scripts/
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
FRONTEND="${ROOT}/frontend"
DRY_RUN="${DRY_RUN:-0}"
MAX_VIDEOS="${MAX_VIDEOS:-12}"

if [[ -z "${PR_NUMBER}" ]]; then
  echo "Usage: PR_NUMBER=<n> $0   (or: $0 <pr-number>)" >&2
  exit 1
fi

if [[ -z "${REPO}" ]]; then
  REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
fi

# Ensure gh supports --attach
if ! gh pr comment --help 2>&1 | grep -q -- '--attach'; then
  echo "gh CLI too old for --attach (need >= 2.99.0). Installing…" >&2
  GH_VERSION="2.99.0"
  ARCH="$(uname -m)"
  case "${ARCH}" in
    x86_64|amd64) GH_ARCH="amd64" ;;
    aarch64|arm64) GH_ARCH="arm64" ;;
    *) echo "Unsupported arch: ${ARCH}" >&2; exit 1 ;;
  esac
  TMP="$(mktemp -d)"
  curl -fsSL -o "${TMP}/gh.tgz" \
    "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${GH_ARCH}.tar.gz"
  tar -xzf "${TMP}/gh.tgz" -C "${TMP}"
  export PATH="${TMP}/gh_${GH_VERSION}_linux_${GH_ARCH}/bin:${PATH}"
  gh --version
fi

caption_for_png() {
  local base
  base="$(basename "$1" .png)"
  base="${base%-chromium}"
  base="${base%-linux}"
  echo "${base//-/ }"
}

caption_for_video() {
  local dir
  dir="$(basename "$(dirname "$1")")"
  # Playwright folder: landmarks-ui-LandmarksWidg-<hash>-<slug>-chromium
  if [[ "${dir}" =~ LandmarksWidg-[a-f0-9]+-(.+)-chromium$ ]]; then
    echo "${BASH_REMATCH[1]//-/ }"
  else
    echo "${dir}"
  fi
}

mapfile -t SNAPSHOTS < <(
  find "${FRONTEND}/e2e" -type d -name '*-snapshots' -print0 2>/dev/null     | xargs -0 -I{} find {} -type f \( -name '*.png' -o -name '*.PNG' \) 2>/dev/null     | sort || true
)

mapfile -t VIDEOS < <(find "${FRONTEND}/test-results" \( -name '*.webm' -o -name '*.mp4' \) -type f 2>/dev/null | sort || true)
if [[ ${#VIDEOS[@]} -gt ${MAX_VIDEOS} ]]; then
  VIDEOS=("${VIDEOS[@]:0:${MAX_VIDEOS}}")
fi

BODY_FILE="$(mktemp)"
ATTACH_ARGS=()

{
  echo "${MARKER}"
  echo "## Playwright visuals"
  echo
  echo "Sticky review surface for Landmarks UI e2e (snapshots + videos)."
  echo "Artifacts remain a backup if anything below fails to render."
  echo
  echo "_SHA: \`${GITHUB_SHA:-$(git -C "${ROOT}" rev-parse --short HEAD 2>/dev/null || echo unknown)}\`_"
  echo

  if [[ ${#SNAPSHOTS[@]} -eq 0 ]]; then
    echo "_No snapshot PNGs found under \`frontend/e2e/**/*-snapshots/\`._"
    echo
  else
    echo "### Snapshots"
    echo
    for png in "${SNAPSHOTS[@]}"; do
      cap="$(caption_for_png "${png}")"
      # Absolute path for --attach rewrite; markdown uses same path
      echo "**${cap}**"
      echo
      echo "![${cap}](${png})"
      echo
      ATTACH_ARGS+=(--attach "${png}#${cap}")
    done
  fi

  if [[ ${#VIDEOS[@]} -eq 0 ]]; then
    echo "### Videos"
    echo
    echo "_No videos found under \`frontend/test-results/**/*.{webm,mp4}\`._"
    echo
  else
    echo "### Videos"
    echo
    echo "> Videos may need download / open-in-browser if GitHub does not inline the player."
    echo
    for vid in "${VIDEOS[@]}"; do
      cap="$(caption_for_video "${vid}")"
      echo "**${cap}**"
      echo
      # Lone image ref in its paragraph so gh rewrites to an inline video player URL
      echo "![](${vid})"
      echo
      ATTACH_ARGS+=(--attach "${vid}")
    done
  fi
} > "${BODY_FILE}"

echo "Prepared comment body ($(wc -l < "${BODY_FILE}") lines)," \
  "${#SNAPSHOTS[@]} snapshot(s), ${#VIDEOS[@]} video(s)."

if [[ "${DRY_RUN}" == "1" ]]; then
  echo "---- body preview ----"
  cat "${BODY_FILE}"
  echo "---- attach args ----"
  printf '%s\n' "${ATTACH_ARGS[@]}"
  echo "DRY_RUN=1 — not posting."
  rm -f "${BODY_FILE}"
  exit 0
fi

# Sticky: delete prior marker comment (same bot / user), then create fresh with uploads
EXISTING_IDS="$(gh api "repos/${REPO}/issues/${PR_NUMBER}/comments" --paginate \
  --jq ".[] | select(.body | contains(\"${MARKER}\")) | .id" 2>/dev/null || true)"

for cid in ${EXISTING_IDS}; do
  echo "Deleting previous sticky comment ${cid}…"
  gh api -X DELETE "repos/${REPO}/issues/comments/${cid}" >/dev/null
done

echo "Posting sticky comment on ${REPO}#${PR_NUMBER}…"
gh pr comment "${PR_NUMBER}" -R "${REPO}" \
  --body-file "${BODY_FILE}" \
  "${ATTACH_ARGS[@]}"

rm -f "${BODY_FILE}"
echo "Done."
