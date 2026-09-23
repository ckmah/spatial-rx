# Roadmap

Not a viewer. A thinking surface for spatial biology.

Notebook-native widgets tie AnnData-backed analysis to interactive tissue exploration.
See [`frontend/PRODUCT.md`](frontend/PRODUCT.md) for positioning and shipped capabilities.

## Now

**VolumeCube (Viv)** — isometric OME-Zarr detail cube with Landmarks inspect-window
feed (`window_cx`, `window_cy`, `window_size_um`). Active work: [PR #35](https://github.com/ckmah/spatial-rx/pull/35) on branch `cursor/viv-cube-widget-60f9`.

Verification loop for this PR:

- Playwright tier: `frontend/e2e/volume-cube/`
- Agent feature map: [`.agents/skills/verify-volume-cube/`](.agents/skills/verify-volume-cube/)
- Demo: `demos/volume-cube.py`

## Next

TBD — pick up from issues or briefs after VolumeCube lands.

## Later

—
