# Demo data (ileum AnnData + rebuild sources)

Landmarks and gut-study notebooks load the SPF ileum panel via fsspec from
`demos/data/ileum.h5ad` on GitHub (`org=ckmah`, `repo=spatial-rx`, `sha=main`).
CSV under `ileum/` is the rebuild source only.

## Layout

```
ileum.h5ad                 # SPF ileum panel AnnData (committed, <10 MB)
                           # X, obs, obsm['spatial'], cell_type colors
ileum/
  cells.csv                # x, y, cell_type, cell_class, anatomical_layer, mucosal_pseudospace
                           # (square-cropped SPF ileum slice, n=20185)
  expr.csv                 # 14-gene expression panel, same row order as cells.csv
recipes/
  *.svg                    # use-case gallery schematics for gut_study
figure1_spatial_analogy.png  # Zormpas et al. geography ↔ biology framing
build_ileum_h5ad.py        # regenerate ileum.h5ad from ileum/*.csv
export_from_raw.py         # regenerate ileum/*.csv from a source .h5ad
```

## Provenance

- **ileum/** — derived from Xu et al., *Cell Host Microbe* (2026), SPF ileum
  cross-section `20211215_WT_ile1_slice_4` (pre-cropped).
- **figure1_spatial_analogy.png** — from Zormpas et al., *Cell* (2023)
  (geography ↔ spatial transcriptomics analogy).
- **Volume cube demo** (`demos/volume-cube.py`) — IDR study
  [idr0062](https://idr.openmicroscopy.org/search/?query=Name:idr0062) (Blin
  nuclear segmentation), OME-Zarr served from
  `https://minio-dev.openmicroscopy.org/idr/v0.3/idr0062-blin-nuclearsegmentation/6001240.zarr`
  (level 0: 2 × 236 × 275 × 271, c/z/y/x, LaminB1 + DAPI). Not committed to
  git; offline fallback is `VolumeCubeWidget.toy()`.

To regenerate CSVs from a source panel `.h5ad`:

```bash
uv run --extra demo python demos/data/export_from_raw.py --ileum-h5ad /path/to/source.h5ad
```

To rebuild `ileum.h5ad` from those CSVs:

```bash
uv run --extra demo python demos/data/build_ileum_h5ad.py
```
