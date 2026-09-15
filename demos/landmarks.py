import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell
def _():
    import sys
    from pathlib import Path

    import marimo as mo
    import numpy as np
    import scanpy as sc
    import squidpy as sq
    from spatial_rx import (
        LandmarksWidget,
        landmarks_to_geodataframe,
    )

    _demos = Path(__file__).resolve().parent
    if str(_demos) not in sys.path:
        sys.path.insert(0, str(_demos))
    from ileum_data import load_ileum_adata

    return LandmarksWidget, landmarks_to_geodataframe, load_ileum_adata, mo, np, sc, sq


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Landmarks

    SPF ileum slice from `demos/data/ileum.h5ad` (Xu et al.).

    1. Draw/edit landmarks on the canvas; use the contextual toolbar for buffer /
       style and neighborhood controls.
    2. Wrap the widget in `mo.ui.anywidget` so landmark edits re-run downstream
       cells; build a GeoDataFrame from `widget.landmarks`.
    3. Enable Radius/k-NN on a type or selection → **Make selection** on the
       contextual bar to promote the neighborhood.
    """)
    return


@app.cell
def _(load_ileum_adata):
    adata = load_ileum_adata()
    return (adata,)


@app.cell
def _(adata, sc):
    # Exploratory PCA (also stored on ileum.h5ad as X_pca).
    _n_comps = min(10, adata.n_vars - 1, adata.n_obs - 1)
    sc.pp.pca(adata, n_comps=_n_comps)
    return


@app.cell
def _(adata, sc):
    # Exploratory UMAP on expression-space neighbors (also stored as X_umap).
    _n_comps = min(10, adata.obsm["X_pca"].shape[1], adata.n_obs - 1)
    sc.pp.neighbors(adata, n_pcs=_n_comps, use_rep="X_pca", random_state=0)
    sc.tl.umap(adata, init_pos="random", random_state=0)
    return


@app.cell
def _(adata, np, sq):
    # Spatial neighbor graphs for the widget (k-max / radius-max supersets).
    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    radius = 0.05 * float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", n_neighs=64, key_added="spatial_knn"
    )
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", radius=radius, key_added="spatial_radius"
    )
    return


@app.cell
def _(LandmarksWidget, adata, mo):
    widget = mo.ui.anywidget(LandmarksWidget(adata))
    return (widget,)


@app.cell
def _(widget):
    widget
    return


@app.cell
def _(landmarks_to_geodataframe, widget):
    landmarks_gdf = landmarks_to_geodataframe(widget.landmarks)
    landmarks_gdf
    return


if __name__ == "__main__":
    app.run()
