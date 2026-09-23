# Roadmap

Not a viewer. A thinking surface for spatial biology.

Notebook-native widgets tie AnnData-backed analysis to interactive tissue exploration.
See [`frontend/PRODUCT.md`](frontend/PRODUCT.md) for positioning and shipped capabilities.

## Now

**Luxar SpatialData explore/share viewer** — parallel anywidget for compiled SpatialData scenes (points, meshes, optional Gaussian splats). Not a VolumeCube backend.
Active: [#44](https://github.com/ckmah/spatial-rx/issues/44).

Verification: `tests/test_luxar.py` (CPU compile + widget serve); demo `demos/luxar_blobs3d.py`. Image→splat path gated behind `spatial-rx[luxar-gsplats]`.

## Next

TBD — pick from icebox after Luxar v1 lands.

## Later / icebox

- GitHub Pages landing + docs — draft [PR #32](https://github.com/ckmah/spatial-rx/pull/32)
- Polyrender Soft Float / meshify — draft [PR #28](https://github.com/ckmah/spatial-rx/pull/28) (parked; Luxar meshes supersede this path for SpatialData explore/share)

## Shipped recently

- Landmarks↔VolumeCube analysis loop — [#40](https://github.com/ckmah/spatial-rx/issues/40): inspect drives cube window; Python reads window/slice traits; `demos/volume-cube.py`
- VolumeCube (Viv) — [PR #35](https://github.com/ckmah/spatial-rx/pull/35): toy OME-Zarr, inspect→window, Marimo XYZ slices, labels lazy-off, yaw-only + Reset; verify-volume-cube feature map
