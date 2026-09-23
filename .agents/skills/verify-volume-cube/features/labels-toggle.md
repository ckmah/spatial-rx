# labels-toggle

Labels switch lazily loads and shows the second Viv VolumeViewer overlay for OME-Zarr labels.

**Spec:** `frontend/e2e/volume-cube/volume-cube.spec.ts` — `"labels switch shows and hides the labels VolumeViewer overlay"`

## Sub-features

- Labels off at boot: one canvas (image only); labels OME-Zarr not loaded
- Labels on: two canvases (image + labels blend)
- Labels off again: one canvas
- Switch reflects checked state

## How to get to it (user POV)

Below the volume viewport, toggle **Labels** on to load and show the segmentation overlay; off to hide it and release the second volume texture.

## Driving it with Playwright

```ts
await bootVolumeCubeHarness(page);
const widget = volumeCubeWidget(page);
const canvases = widget.locator("canvas");

await expect(canvases).toHaveCount(1);
await page.getByRole("switch", { name: "Labels" }).click();
await page.waitForTimeout(400);
await expect(page.getByRole("switch", { name: "Labels" })).toBeChecked();
await expect(canvases).toHaveCount(2);

await page.getByRole("switch", { name: "Labels" }).click();
await page.waitForTimeout(200);
await expect(page.getByRole("switch", { name: "Labels" })).not.toBeChecked();
await expect(canvases).toHaveCount(1);

await shot(page, "labels-off", widget);
```

Helpers: `bootVolumeCubeHarness`, `volumeCubeWidget`, `shot`.

Selectors: `getByRole("switch", { name: "Labels" })`.

Model keys: `labels_url` (must be set for overlay to load when toggled on).

**Proof**

- Functional: canvas count 1 → 2 → 1; switch tracks on/off.
- Visual: `shot(page, "labels-off", widget)` → snapshot `labels-off.png`.

## Gotchas

- Labels overlay is client-local (`showLabels` state) — not a synced traitlet.
- Labels OME-Zarr is fetched only when the switch is turned on (GPU memory hardening).
- Requires `labels_url` pointing at a valid OME-Zarr labels group (toy fixture provides one).
