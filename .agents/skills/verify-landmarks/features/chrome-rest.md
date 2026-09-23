# chrome-rest

Soft Float chrome at rest before any interaction.

**Spec:** `frontend/e2e/landmarks/landmarks.spec.ts` — `"zoom in/out/reset buttons change viewState"` (preamble)

## Sub-features

- Landmarks widget shell visible (`.landmarks`)
- WebGL canvas mounted (`canvas.landmarks__webgl`)
- Default view state loaded (finite zoom via engine)
- Soft Float toolbar/chrome layout at idle

## How to get to it (user POV)

Open the LandmarksWidget in the notebook harness (Playwright loads `/` with the Vite
landmarks dev entry). On first paint, the widget shows the tissue scatter with chrome
at rest — no mode selected, no landmark authoring in progress.

## Driving it with Playwright

```ts
await bootLandmarksHarness(page);
const widget = page.locator(".landmarks").first();
await shot(page, "rest", widget);
```

Helpers: `bootLandmarksHarness`, `waitForEngine`, `stabilizeUi`, `shot`.

Engine readiness (inside `waitForEngine`):

```ts
await page.waitForFunction(() => {
  const eng = (window as any).__landmarksEngine;
  const vs = eng?.getViewState?.();
  return Boolean(vs && Number.isFinite(vs.zoom));
});
```

**Proof**

- Visual: `shot(page, "rest", widget)` → snapshot `rest.png` (see
  [`frontend/e2e/README.md`](../../../frontend/e2e/README.md)).
- Functional: `.landmarks` and `canvas.landmarks__webgl` visible; `getZoom(page)` returns a finite number.

## Gotchas

- `stabilizeUi` disables CSS animations/transitions for deterministic screenshots.
- Screenshots are skipped on macOS unless `E2E_SCREENSHOTS=1`; CI/Linux is canonical.
- Theme is forced dark via `localStorage` in `bootLandmarksHarness` for stable snapshots.
