# coord-contract-xy-frame

Landmarks ``obsm["spatial"]`` XY and VolumeCube ``window_cx`` / ``window_cy`` /
``slice_*`` traits share the same coordinate frame: **one unit = one voxel**
for the demo extents (toy: 256×256; Blin: 271×275×236).

**Spec:** `tests/test_volume_cube.py` — `test_coord_contract_landmarks_cube_xy`  
**Playwright:** `frontend/e2e/volume-cube/notebook-link.spec.ts` — `"inspect traits stay within volume XY extents"`

## Sub-features

- ``cells_in_inspect_window`` counts points in the 100-unit inspect square
- Cube slice maxima match known volume shape from ``from_url(shape_zyx=...)``
- Inspect center copied to ``window_cx`` / ``window_cy`` stays inside XY bounds

## How to get to it (user POV)

In ``demos/volume-cube.py``, synthetic cell coordinates are drawn in the same
XY frame as the cube. Click **Inspect** on tissue — the analysis cell reports
how many cells fall inside the inspect window at the synced window center.

## Driving it with Playwright

```ts
await bootNotebookLinkHarness(page);
await page.getByRole("radio", { name: "Inspect", exact: true }).click();
const box = await canvasBox(page);
await page.mouse.click(box.x + box.width * 0.62, box.y + box.height * 0.38);
const inspectCx = Number(await getModel(page, "inspect_cx"));
const windowCx = Number(await getVolumeModel(page, "window_cx"));
expect(windowCx).toBeCloseTo(inspectCx, 0);
expect(inspectCx).toBeGreaterThan(0);
expect(inspectCx).toBeLessThan(256);
```

**Proof**

- Functional: pytest coord contract; Playwright inspect/window parity and in-bounds XY.
- Visual: no dedicated anchor.

## Gotchas

- ``inspect_size_um`` / ``window_size_um`` label says µm but demo treats units as voxels.
- Blin IDR URL is not fetched in CI; harness and pytest use toy extents offline.
