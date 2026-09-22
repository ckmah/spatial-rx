# window-trait-readout

Patching `window_cx` / `window_cy` on the model updates the chrome readout without canvas interaction.

**Spec:** `frontend/e2e/volume-cube/volume-cube.spec.ts` — `"model patch updates window readout without inspect drag"`

## Sub-features

- `setVolumeModel` writes synced window traits
- Status line shows rounded coordinates

## How to get to it (user POV)

In a notebook, assign `cube.window_cx` / `cube.window_cy` from Python (or from
Landmarks inspect traits in a reactive cell). The widget footer readout updates.

## Driving it with Playwright

```ts
await bootVolumeCubeHarness(page);
const widget = volumeCubeWidget(page);

await setVolumeModel(page, { window_cx: 64, window_cy: 192 });
await page.waitForTimeout(150);

expect(Number(await getVolumeModel(page, "window_cx"))).toBeCloseTo(64, 0);
expect(Number(await getVolumeModel(page, "window_cy"))).toBeCloseTo(192, 0);
await expect(widget.getByText(/window 64, 192 · 100 µm · full Z/)).toBeVisible();
```

Helpers: `bootVolumeCubeHarness`, `setVolumeModel`, `getVolumeModel`, `volumeCubeWidget`.

Model keys: `window_cx`, `window_cy`.

**Proof**

- Functional: model values and readout text match the patch.

## Gotchas

- Readout uses `Math.round` on trait values — assert integer text, not raw floats.
