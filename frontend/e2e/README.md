# Landmarks UI e2e (Playwright)

Headless coverage for LandmarksWidget chrome regressions (zoom, authoring, shift+wheel
neighborhood, selection outline) plus **visual snapshots** via `toHaveScreenshot`.

## Decision: how screenshots are reviewed

**Primary review path:** committed PNG snapshots under
`frontend/e2e/landmarks-ui.spec.ts-snapshots/`. On a PR, reviewers see image diffs in the
GitHub **Files changed** tab (added/changed `*.png`). That is the main loop — no random
image hosts, and no need to open artifacts just to review UI.

**Secondary:** CI uploads the Playwright HTML report and `test-results/` (failure
screenshots / diffs) as Actions artifacts for debugging flaky runs.

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
| `landmark-selected` | Landmark selection (no selection outline) |
| `selection-selected` | Active selection outline |
| `selection-mode-geometry` | Selection tool + geometry ModeToggle |
| `pointer-pin` | Pointer mode with inspect pin |

Paths: `frontend/e2e/landmarks-ui.spec.ts-snapshots/<name>-chromium.png`

## CI

Workflow: `.github/workflows/frontend-e2e.yml` (`Frontend e2e`)

- Triggers: `pull_request`, `push` to `main`, and `workflow_dispatch`
- Runs `npm run test:e2e` (never `--update-snapshots` on PRs)
- Always uploads artifacts (retention 14 days):
  - `playwright-report` — HTML report
  - `playwright-test-results` — failure screenshots / traces
- `workflow_dispatch` + `update_snapshots=true` regenerates PNGs and uploads
  `playwright-snapshots` for you to commit

## Reviewing a PR

1. Open the PR → **Files changed**
2. Filter or scroll to `*-snapshots/*.png`
3. GitHub shows before/after image diffs for chrome changes
4. If CI failed on screenshots, download `playwright-test-results` / `playwright-report`
   from the failed Actions run for pixel diffs and traces
