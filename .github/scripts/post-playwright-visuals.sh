#!/usr/bin/env bash
# Post / update a sticky PR comment with Playwright snapshot PNGs + videos.
# Prefer gh >= 2.99 --attach (needs classic PAT / OAuth). Fall back to
# raw.githubusercontent.com for committed snapshots when GITHUB_TOKEN cannot attach.
set -euo pipefail

MARKER="<!-- playwright-visuals -->"
REPO="${GITHUB_REPOSITORY:-}"
PR_NUMBER="${PR_NUMBER:-${1:-}}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
FRONTEND="${ROOT}/frontend"
DRY_RUN="${DRY_RUN:-0}"
MAX_VIDEOS="${MAX_VIDEOS:-12}"
SHA="${PR_HEAD_SHA:-${GITHUB_SHA:-$(git -C "${ROOT}" rev-parse HEAD 2>/dev/null || echo unknown)}}"
echo "Using SHA=${SHA} for embeds (PR_HEAD_SHA=${PR_HEAD_SHA:-unset})"
RUN_URL="${GITHUB_SERVER_URL:-https://github.com}/${REPO}/actions/runs/${GITHUB_RUN_ID:-}"

if [[ -z "${PR_NUMBER}" ]]; then
  echo "Usage: PR_NUMBER=<n> $0   (or: $0 <pr-number>)" >&2
  exit 1
fi

if [[ -z "${REPO}" ]]; then
  REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
fi

ensure_gh_attach() {
  if gh pr comment --help 2>&1 | grep -q -- '--attach'; then
    return 0
  fi
  echo "gh CLI too old for --attach (need >= 2.99.0). Installing…" >&2
  local GH_VERSION="2.99.0" ARCH GH_ARCH TMP
  ARCH="$(uname -m)"
  case "${ARCH}" in
    x86_64|amd64) GH_ARCH="amd64" ;;
    aarch64|arm64) GH_ARCH="arm64" ;;
    *) echo "Unsupported arch: ${ARCH}" >&2; return 1 ;;
  esac
  TMP="$(mktemp -d)"
  curl -fsSL -o "${TMP}/gh.tgz" \
    "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${GH_ARCH}.tar.gz"
  tar -xzf "${TMP}/gh.tgz" -C "${TMP}"
  export PATH="${TMP}/gh_${GH_VERSION}_linux_${GH_ARCH}/bin:${PATH}"
  gh --version
}

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
  if [[ "${dir}" =~ LandmarksWidg-[a-f0-9]+-(.+)-chromium$ ]]; then
    echo "${BASH_REMATCH[1]//-/ }"
  else
    echo "${dir}"
  fi
}

# Classic PAT (ghp_) / OAuth (gho_) can attach; Actions GITHUB_TOKEN (ghs_) cannot.
can_attach() {
  local tok="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
  [[ "${FORCE_ATTACH:-}" == "1" ]] && return 0
  [[ "${FORCE_RAW:-}" == "1" ]] && return 1
  if [[ -z "${tok}" ]]; then
    return 0
  fi
  [[ "${tok}" == ghp_* || "${tok}" == gho_* ]]
}

mapfile -t SNAPSHOTS < <(
  find "${FRONTEND}/e2e" -type d -name '*-snapshots' -print0 2>/dev/null \
    | xargs -0 -I{} find {} -type f \( -name '*.png' -o -name '*.PNG' \) 2>/dev/null \
    | sort || true
)
filtered=()
for f in "${SNAPSHOTS[@]+"${SNAPSHOTS[@]}"}"; do
  [[ -n "${f}" && -f "${f}" ]] && filtered+=("${f}")
done
SNAPSHOTS=("${filtered[@]+"${filtered[@]}"}")

mapfile -t VIDEOS < <(find "${FRONTEND}/test-results" \( -name '*.webm' -o -name '*.mp4' \) -type f 2>/dev/null | sort || true)
filtered=()
for f in "${VIDEOS[@]+"${VIDEOS[@]}"}"; do
  [[ -n "${f}" && -f "${f}" ]] && filtered+=("${f}")
done
VIDEOS=("${filtered[@]+"${filtered[@]}"}")
if [[ ${#VIDEOS[@]} -gt ${MAX_VIDEOS} ]]; then
  VIDEOS=("${VIDEOS[@]:0:${MAX_VIDEOS}}")
fi

ensure_gh_attach || true

BODY_FILE="$(mktemp)"
ATTACH_ARGS=()
MODE="raw"

write_body_attach() {
  MODE="attach"
  {
    echo "${MARKER}"
    echo "## Playwright visuals"
    echo
    echo "Sticky review surface for Landmarks UI e2e (snapshots + videos)."
    echo "Artifacts remain a backup if anything below fails to render."
    echo
    echo "_SHA: \`${SHA}\`_"
    echo
    if [[ ${#SNAPSHOTS[@]} -eq 0 ]]; then
      echo "_No snapshot PNGs found under \`frontend/e2e/**/*-snapshots/\`._"
      echo
    else
      echo "<details>"
      echo "<summary><strong>Snapshots</strong> (${#SNAPSHOTS[@]})</summary>"
      echo
      for png in "${SNAPSHOTS[@]}"; do
        cap="$(caption_for_png "${png}")"
        echo "**${cap}**"
        echo
        echo "![${cap}](${png})"
        echo
        ATTACH_ARGS+=(--attach "${png}#${cap}")
      done
      echo "</details>"
      echo
    fi
    if [[ ${#VIDEOS[@]} -eq 0 ]]; then
      echo "_No videos found under \`frontend/test-results/**/*.{webm,mp4}\`._"
      echo
    else
      echo "<details>"
      echo "<summary><strong>Videos</strong> (${#VIDEOS[@]})</summary>"
      echo
      echo "> Videos may need download / open-in-browser if GitHub does not inline the player."
      echo
      for vid in "${VIDEOS[@]}"; do
        cap="$(caption_for_video "${vid}")"
        echo "**${cap}**"
        echo
        echo "![](${vid})"
        echo
        ATTACH_ARGS+=(--attach "${vid}")
      done
      echo "</details>"
      echo
    fi
  } > "${BODY_FILE}"
}

write_body_raw() {
  MODE="raw"
  ATTACH_ARGS=()
  {
    echo "${MARKER}"
    echo "## Playwright visuals"
    echo
    echo "Sticky review surface for Landmarks UI e2e."
    echo "Snapshots embed from the PR head commit; videos are on the workflow artifacts"
    echo "(Actions \`GITHUB_TOKEN\` cannot use \`gh --attach\` — set repo secret \`VISUALS_GH_TOKEN\`"
    echo "to a classic PAT with \`repo\` scope for inline uploads)."
    echo
    echo "_SHA: \`${SHA}\`_"
    echo
    if [[ ${#SNAPSHOTS[@]} -eq 0 ]]; then
      echo "_No snapshot PNGs found under \`frontend/e2e/**/*-snapshots/\`._"
      echo
    else
      echo "<details>"
      echo "<summary><strong>Snapshots</strong> (${#SNAPSHOTS[@]})</summary>"
      echo
      for png in "${SNAPSHOTS[@]}"; do
        cap="$(caption_for_png "${png}")"
        rel="${png#"${ROOT}/"}"
        url="https://raw.githubusercontent.com/${REPO}/${SHA}/${rel}"
        echo "**${cap}**"
        echo
        echo "![${cap}](${url})"
        echo
      done
      echo "</details>"
      echo
    fi
    echo "<details>"
    echo "<summary><strong>Videos</strong> (${#VIDEOS[@]})</summary>"
    echo
    if [[ ${#VIDEOS[@]} -gt 0 ]]; then
      echo "Recorded **${#VIDEOS[@]}** video(s) this run. Download artifact **\`playwright-videos\`**"
      echo "(or \`playwright-test-results\`) from the workflow run:"
      echo
      if [[ -n "${GITHUB_RUN_ID:-}" ]]; then
        echo "- ${RUN_URL}"
      else
        echo "- Actions → Frontend e2e → Artifacts"
      fi
      echo
      echo "Files:"
      for vid in "${VIDEOS[@]}"; do
        echo "- $(caption_for_video "${vid}") (\`$(basename "${vid}")\`)"
      done
    else
      echo "_No videos found under \`frontend/test-results/**/*.{webm,mp4}\`._"
    fi
    echo
    echo "</details>"
    echo
  } > "${BODY_FILE}"
}

if can_attach && gh pr comment --help 2>&1 | grep -q -- '--attach'; then
  write_body_attach
else
  write_body_raw
fi

echo "Prepared comment body ($(wc -l < "${BODY_FILE}") lines)," \
  "${#SNAPSHOTS[@]} snapshot(s), ${#VIDEOS[@]} video(s), mode=${MODE}."

if [[ "${DRY_RUN}" == "1" ]]; then
  echo "---- body preview ----"
  cat "${BODY_FILE}"
  echo "---- attach args ----"
  printf '%s\n' "${ATTACH_ARGS[@]+"${ATTACH_ARGS[@]}"}"
  echo "DRY_RUN=1 — not posting."
  rm -f "${BODY_FILE}"
  exit 0
fi

delete_sticky() {
  local EXISTING_IDS cid
  EXISTING_IDS="$(gh api "repos/${REPO}/issues/${PR_NUMBER}/comments" --paginate \
    --jq ".[] | select(.body | contains(\"${MARKER}\")) | .id" 2>/dev/null || true)"
  for cid in ${EXISTING_IDS}; do
    echo "Deleting previous sticky comment ${cid}…"
    gh api -X DELETE "repos/${REPO}/issues/comments/${cid}" >/dev/null || true
  done
}

post_with_attach() {
  if [[ ${#ATTACH_ARGS[@]} -gt 0 ]]; then
    gh pr comment "${PR_NUMBER}" -R "${REPO}" --body-file "${BODY_FILE}" "${ATTACH_ARGS[@]}"
  else
    gh pr comment "${PR_NUMBER}" -R "${REPO}" --body-file "${BODY_FILE}"
  fi
}

post_raw() {
  # Prefer editing existing sticky; else create
  local EXISTING_ID
  EXISTING_ID="$(gh api "repos/${REPO}/issues/${PR_NUMBER}/comments" --paginate \
    --jq ".[] | select(.body | contains(\"${MARKER}\")) | .id" 2>/dev/null | head -1 || true)"
  if [[ -n "${EXISTING_ID}" ]]; then
    echo "Updating sticky comment ${EXISTING_ID}…"
    jq -n --rawfile body "${BODY_FILE}" '{body: $body}' \
      | gh api -X PATCH "repos/${REPO}/issues/comments/${EXISTING_ID}" --input - >/dev/null
    echo "https://github.com/${REPO}/pull/${PR_NUMBER}#issuecomment-${EXISTING_ID}"
  else
    gh pr comment "${PR_NUMBER}" -R "${REPO}" --body-file "${BODY_FILE}"
  fi
}

echo "Posting sticky comment on ${REPO}#${PR_NUMBER} (mode=${MODE})…"
if [[ "${MODE}" == "attach" ]]; then
  delete_sticky
  if ! post_with_attach; then
    echo "Attach failed; falling back to raw.githubusercontent.com embeds…" >&2
    write_body_raw
    post_raw
  fi
else
  post_raw
fi

rm -f "${BODY_FILE}"
echo "Done."
