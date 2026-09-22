# labels-toggle

Labels switch shows or hides the second Viv VolumeViewer overlay for OME-Zarr labels.

**Spec:** `frontend/e2e/volume-cube/volume-cube.spec.ts` — `"labels switch hides the labels VolumeViewer overlay"`

## Sub-features

- Labels on: two canvases (image + labels blend)
- Labels off: one canvas (image only)
- Switch reflects checked state

## How to get to it (user POV)

Below the volume viewport, toggle **Labels** off to hide segmentation overlay; on to restore it.

## Driving it with Playwright

```ts
await bootVolumeCubeHarness(page);
const widget = volumeCubeWidget(page);
const canvases = widget.locator("canvas");

await expect(canvases).toHaveCount(2);
await page.getByRole("switch", { name: "Labels" }).click();
await page.waitForTimeout(200);
await expect(page.getByRole("switch", { name: "Labels" })).not.toBeChecked();
await expect(canvases).toHaveCount(1);

await shot(page, "labels-off", widget);
```

Helpers: `bootVolumeCubeHarness`, `volumeCubeWidget`, `shot`.

Selectors: `getByRole("switch", { name: "Labels" })`.

Model keys: `labels_url` (must be set for overlay to mount at boot).

**Proof**

- Functional: canvas count 2 → 1; switch unchecked.
- Visual: `shot(page, "labels-off", widget)` → snapshot `labels-off.png`.

## Gotchas

- Labels overlay is client-local (`showLabels` state) — not a synced traitlet.
- Requires `labels_url` pointing at a valid OME-Zarr labels group (toy fixture provides one).
