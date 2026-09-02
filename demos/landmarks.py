# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo>=0.24.0",
#     "anndata",
#     "numpy",
#     "pandas",
#     "squidpy",
#     "spatial-rx[demo]",
# ]
#
# [tool.uv.sources]
# spatial-rx = { path = "../", editable = true }
# ///

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    import numpy as np
    import pandas as pd
    import squidpy as sq
    from spatial_rx import LandmarksWidget

    return LandmarksWidget, mo, np, pd, sq


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Cell-set neighborhood

    Load seqFISH, compute **k-NN and radius** graphs with squidpy, then expand a
    lasso or category using those precomputed graphs (Off / Radius / k-NN).
    """)
    return


@app.cell
def _(LandmarksWidget, np, pd, sq):
    CLUSTER = "celltype_mapped_refined"
    adata = sq.datasets.seqfish()
    adata.obs[CLUSTER] = pd.Categorical(adata.obs[CLUSTER].astype(str))
    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    radius = 0.05 * float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", n_neighs=12, key_added="spatial_knn"
    )
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", radius=radius, key_added="spatial_radius"
    )
    genes = [str(g) for g in adata.var_names[:8]]
    widget = LandmarksWidget.from_anndata(
        adata,
        color=CLUSTER,
        genes=genes,
        width=1100,
        height=700,
        point_size=2.0,
        point_opacity=0.8,
    )
    widget
    return


if __name__ == "__main__":
    app.run()
