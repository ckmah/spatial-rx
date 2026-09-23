# Roadmap

Not a viewer. A thinking surface for spatial biology.

Notebook-native widgets tie AnnData-backed analysis to interactive tissue exploration.
See [`frontend/PRODUCT.md`](frontend/PRODUCT.md) for positioning and shipped capabilities.

## Now

**Landmarks↔VolumeCube analysis loop** — drive VolumeCube from Landmarks inspect and use window/slice state in Python analysis (not only visual sync).
Active: [#40](https://github.com/ckmah/spatial-rx/issues/40).

Verification: extend `.agents/skills/verify-volume-cube/` + `frontend/e2e/volume-cube/`; demo `demos/volume-cube.py`.

## Next

TBD — pick from icebox after #40.

## Later / icebox

- GitHub Pages landing + docs — draft [PR #32](https://github.com/ckmah/spatial-rx/pull/32)
- Polyrender Soft Float / meshify — draft [PR #28](https://github.com/ckmah/spatial-rx/pull/28) (parked; Viv VolumeCube is the 3D detail path for now)

## Shipped recently

- VolumeCube (Viv) — [PR #35](https://github.com/ckmah/spatial-rx/pull/35): toy OME-Zarr, inspect→window, Marimo XYZ slices, labels lazy-off, yaw-only + Reset; verify-volume-cube feature map
