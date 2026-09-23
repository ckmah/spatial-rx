# harness-boots-volume

VolumeCube harness loads the toy OME-Zarr and renders an isometric Viv volume with chrome controls.

**Spec:** `frontend/e2e/volume-cube/volume-cube.spec.ts` — `"harness boots and OME-Zarr volume renders"`

## Sub-features

- Vite harness serves toy OME-Zarr from `frontend/dev/volume-cube/public/`
- `.volume-cube` shell mounts with Iso, Reset, Labels switch
- Default window readout at center (256, 256) · 100 µm with full-volume slice ranges
- WebGL canvas visible inside the volume host

## How to get to it (user POV)

Open the volume-cube dev harness (`npm run dev:volume-cube`). After OME-Zarr fetch,
the isometric cube appears with toolbar controls below the viewport.

## Driving it with Playwright

```ts
await bootVolumeCubeHarness(page);
const widget = volumeCubeWidget(page);

await expect(widget).toBeVisible();
await expect(page.getByRole("button", { name: "Iso" })).toBeVisible();
await expect(page.getByRole("button", { name: "Reset" })).toBeVisible();
await expect(page.getByRole("switch", { name: "Labels" })).toBeChecked();
await expect(widget.getByText(/window 256, 256 · 100 µm · X 0–512 · Y 0–512 · Z 0–128/)).toBeVisible();
await expect(widget.locator("canvas").first()).toBeVisible();

await shot(page, "rest", widget);
```

Helpers: `bootVolumeCubeHarness`, `volumeCubeWidget`, `shot`.

Selectors: `.volume-cube`, `getByRole("button", { name: "Iso" })`.

Model keys: `image_url`, `window_cx`, `window_cy`, `window_size_um`.

**Proof**

- Functional: Iso/Reset/Labels visible; window readout at default center; canvas present.
- Visual: `shot(page, "rest", widget)` → snapshot `rest.png`.

## Gotchas

- Wait for OME-Zarr load via `bootVolumeCubeHarness` — do not snapshot while `"Loading volume…"` is shown.
- Playwright must set `E2E_HARNESS=volume-cube` (via `npm run test:e2e:volume-cube`) so the correct Vite root starts.
