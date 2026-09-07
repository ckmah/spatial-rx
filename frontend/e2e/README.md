# Landmarks UI e2e (Playwright)

Headless coverage for LandmarksWidget chrome regressions (zoom, authoring, shift+wheel neighborhood, selection outline).

## Run

```bash
cd frontend
npm install
npx playwright install chromium   # Linux/CI
# or use system Chrome on macOS:
npm run test:e2e:mac
```

Uses the Vite dev harness (`frontend/dev`) via `playwright.config.ts` webServer.

Asserts against `window.__landmarksEngine` / `__landmarksModel` hooks exposed by `mountEngine`.
