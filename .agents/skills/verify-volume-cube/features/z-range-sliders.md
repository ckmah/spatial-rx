# z-range-sliders

Z min / Z max sliders adjust the internal Z slice range passed to Viv (functional smoke only).

**Spec:** `frontend/e2e/volume-cube/volume-cube.spec.ts` — `"Z min slider narrows the displayed Z range readout"`

## Sub-features

- Z min slider accepts keyboard nudge
- Widget stays mounted after slider change

## How to get to it (user POV)

Use **Z min** and **Z max** sliders below the volume to clip the displayed Z extent.

## Driving it with Playwright

```ts
await bootVolumeCubeHarness(page);
const widget = volumeCubeWidget(page);
const zMinSlider = widget.getByRole("slider").first();

await zMinSlider.focus();
await page.keyboard.press("ArrowRight");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(150);

await expect(widget.getByText(/window 128, 128 · 100 µm · full Z/)).toBeVisible();
```

Helpers: `bootVolumeCubeHarness`, `volumeCubeWidget`.

Selectors: first `getByRole("slider")` in widget (Z min); second is Z max.

**Proof**

- Functional: slider interaction does not crash the widget; readout still visible.

## Gotchas

- Sliders are shadcn `Slider` components — use role `slider`, not native `input[type=range]`.
- No dedicated visual anchor; Z clipping is subtle in static screenshots.
