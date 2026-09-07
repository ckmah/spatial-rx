# Landmarks UI e2e (Playwright)

Headless coverage for LandmarksWidget chrome regressions (zoom, authoring, shift+wheel
neighborhood, ephemeral selection) plus **visual snapshots** via `toHaveScreenshot`.
Short per-test **videos** are recorded (`video: "on"`) for demos and CI review.

## Decision: how screenshots are reviewed

**Primary review path:** the sticky PR comment posted by CI (see `.github/scripts/post-playwright-visuals.sh`).
After a green `pull_request` e2e run, snapshots + videos are uploaded onto that comment.
**The PR sticky comment is the primary visual review surface.**

Committed snapshot PNGs and Actions artifacts remain backups.

**Secondary:** Files changed image diffs + CI artifacts (`playwright-report`, `playwright-test-results`, `playwright-videos`).

**CI artifacts** (Actions → run → Artifacts) remain a backup for debugging / demos; they are not
where committed snapshot PNGs live:

- `playwright-report` — HTML report
- `playwright-test-results` — failure screenshots, diffs, traces, and per-test videos
- `playwright-videos` — `*.webm` / `*.mp4` harvested from `test-results/` (same videos)

Canonical platform: **Linux Chromium** (GitHub Actions `ubuntu-latest`). Those PNGs are
committed and compared in CI. macOS Chrome (`test:e2e:mac`) runs functional asserts and
**soft-skips** screenshots unless `E2E_SCREENSHOTS=1`.

## Run (functional + screenshots on Linux)

```bash
cd frontend
npm install
npx playwright install chromium   # Linux / CI / Docker
npm run test:e2e
```

Update committed snapshots (do this on Linux — CI machine, Linux box, or Docker mirroring CI):

```bash
npm run test:e2e:update
git add e2e/landmarks-ui.spec.ts-snapshots
git commit -m "Update Playwright visual snapshots"
```

### macOS

```bash
npm run test:e2e:mac          # functional only; screenshots skipped by default
E2E_SCREENSHOTS=1 npm run test:e2e:mac   # compare (may fail vs linux PNGs)
```

Prefer updating snapshots via Linux (Docker Playwright image, or the
`Frontend e2e` workflow_dispatch with `update_snapshots=true`, then download the
`playwright-snapshots` artifact and commit).

Soft-skip everywhere:

```bash
E2E_SCREENSHOTS=0 npm run test:e2e
```

Uses the Vite dev harness (`frontend/dev`) via `playwright.config.ts` `webServer`.

Asserts against `window.__landmarksEngine` / `__landmarksModel` hooks exposed by `mountEngine`.

## Snapshot inventory

| Name | When |
|------|------|
| `default-chrome` | Initial widget chrome |
| `after-zoom-in` | After Zoom in |
| `after-reset` | After Reset view |
| `authoring-point-mode` | Point mode selected |
| `after-place-point` | After placing a landmark |
| `selection-neighborhood` | Selection + neighborhood active |
| `landmark-selected` | Landmark selection (names on-canvas; no Inspect pin) |
| `selection-selected` | Active selection point highlight (no persisted outline) |
| `selection-mode-geometry` | Selection tool (no geometry ModeToggle) |
| `pointer-pin` | Pointer mode with molecule inspect pin |

Paths: `frontend/e2e/landmarks-ui.spec.ts-snapshots/<name>-chromium.png`

## CI

Workflow: `.github/workflows/frontend-e2e.yml` (`Frontend e2e`)

- Triggers: `pull_request`, `push` to `main`, and `workflow_dispatch`
- Permissions: `contents: read`, `pull-requests: write` (sticky PR comment + attach uploads)
- Optional repo secret `VISUALS_GH_TOKEN` (classic PAT, `repo` scope): enables inline `gh --attach` uploads; without it CI embeds committed snapshots via raw.githubusercontent.com and links the videos artifact
- On successful `pull_request` runs: sticky PR comment via `.github/scripts/post-playwright-visuals.sh`
- Runs `npm run test:e2e` (never `--update-snapshots` on PRs)
- Always uploads artifacts as backup (retention 14 days):
  - `playwright-report` — HTML report
  - `playwright-test-results` — failure screenshots / traces / videos
  - `playwright-videos` — recorded `*.webm` / `*.mp4`
- `workflow_dispatch` + `update_snapshots=true` regenerates PNGs and uploads
  `playwright-snapshots` for you to commit

## Videos

Playwright records a short video for every test (`use.video: "on"` in
`playwright.config.ts`). Locally they land under `frontend/test-results/**/video.webm`.

### Review videos on the PR (preferred)

After a green PR e2e run, videos are attached on the sticky **Playwright visuals** comment.

### Download / play from GitHub Actions (backup)

1. Open the **Frontend e2e** workflow run
2. Scroll to **Artifacts**
3. Download `playwright-videos` (or `playwright-test-results`, which also contains videos)
4. Unzip and open `*.webm` in a browser / VLC / QuickTime

The HTML report (`playwright-report`) links to videos for each test when present.

## Reviewing a PR

1. Open the PR → sticky **Playwright visuals** comment (primary review)
2. Skim captioned screenshots (default chrome, pointer pin, after zoom, etc.) and videos
3. Optional: **Files changed** still shows committed `*-snapshots/*.png` image diffs
4. Backup: if the comment is missing or CI failed, download
   `playwright-test-results` / `playwright-videos` / `playwright-report` from the
   Actions run
