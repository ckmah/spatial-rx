# landmarks-inspect-drives-cube

Landmarks **Inspect** mode writes `inspect_cx` / `inspect_cy`; the notebook link copies
those onto `VolumeCubeWidget.window_cx` / `window_cy` (one-way, same as
`demos/volume-cube.py`).

**Spec:** `frontend/e2e/volume-cube/notebook-link.spec.ts` — `"Landmarks inspect click updates VolumeCube window readout"`

## Sub-features

- Landmarks Inspect radio activates crosshair inspect mode on tissue canvas
- Canvas click sets synced `inspect_cx` / `inspect_cy` on LandmarksWidget
- Notebook link copies inspect center onto cube `window_cx` / `window_cy`
- VolumeCube status readout matches rounded window coordinates

## How to get to it (user POV)

In marimo, open `demos/volume-cube.py` (run app or edit with live kernel). The notebook
shows Landmarks and VolumeCube side by side. In Landmarks, choose **Inspect**, click
tissue — the cube window readout updates.

Automated CI uses the **notebook-link harness** (`npm run dev:notebook-link`), which
mounts both widgets with the same Python linking logic as the demo's last cell:

```python
if landmarks.inspect_cx is not None:
    cube.window_cx = float(landmarks.inspect_cx)
    cube.window_cy = float(landmarks.inspect_cy)
```

Headless `marimo run` does not render anywidget output reliably in Playwright today;
use the harness for agent/CI proof and marimo for manual notebook QA.

## Driving it with Playwright

```ts
await bootNotebookLinkHarness(page); // E2E_HARNESS=notebook-link, helper in e2e/helpers.ts
const cube = volumeCubeWidget(page);

await page.getByRole("radio", { name: "Inspect", exact: true }).click();
const box = await canvasBox(page);
await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.38);
await page.waitForTimeout(400);

const inspectCx = Number(await getModel(page, "inspect_cx"));
const inspectCy = Number(await getModel(page, "inspect_cy"));
const windowCx = Number(await getVolumeModel(page, "window_cx"));
const windowCy = Number(await getVolumeModel(page, "window_cy"));
// windowCx ≈ inspectCx, windowCy ≈ inspectCy
```

Helpers: `bootNotebookLinkHarness` (inline in spec), `canvasBox`, `getModel`,
`getVolumeModel`, `volumeCubeWidget`, `waitForEngine`, `waitForVolumeCube`.

Selectors: `getByRole("radio", { name: "Inspect", exact: true })`, `.volume-cube` readout.

Model keys: Landmarks `inspect_cx`, `inspect_cy`; cube `window_cx`, `window_cy`.

**Proof**

- Functional: inspect traits move off center; cube window traits match; readout text updates.
- Visual: no dedicated anchor (functional cross-widget proof).

## Gotchas

- Requires `E2E_HARNESS=notebook-link` so Playwright starts `dev:notebook-link`.
- Landmarks fixture coordinates differ from the toy inspect panel in `dev/volume-cube/` —
  drive Inspect on the **landmarks WebGL canvas**, not the toy square.
- `inspect_cx` is `None` until the first inspect click; cube stays at default center until then.
