import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    import anndata as ad
    import numpy as np
    import pandas as pd
    import squidpy as sq
    from spatial_rx import (
        LandmarksWidget,
        geodataframe_to_landmarks,
        landmarks_to_geodataframe,
    )


    return (
        LandmarksWidget,
        ad,
        geodataframe_to_landmarks,
        landmarks_to_geodataframe,
        mo,
        np,
        pd,
        sq,
    )


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Landmarks that stick (M1 demo)

    SPF ileum slice from `demos/data/ileum` (Xu et al.).

    1. Draw/edit landmarks on the canvas; use the contextual toolbar for buffer /
       style and neighborhood controls.
    2. Wrap the widget in `mo.ui.anywidget` so landmark edits re-run downstream
       cells; build a GeoDataFrame from `widget.landmarks`.
    3. Enable Radius/k-NN on a type or selection → **Make selection** on the
       contextual bar to promote the neighborhood.
    """)
    return


@app.cell
def _(ad, mo, np, pd, sq):
    CLUSTER = "cell_type"
    _cells = pd.read_csv(mo.notebook_dir() / "data" / "ileum" / "cells.csv")
    _expr = pd.read_csv(mo.notebook_dir() / "data" / "ileum" / "expr.csv")
    _obs = _cells.drop(columns=["x", "y"]).copy()
    _obs.index = [f"c{i}" for i in range(len(_obs))]
    adata = ad.AnnData(
        X=_expr.to_numpy(dtype=np.float32),
        obs=_obs,
        var=pd.DataFrame(index=_expr.columns.astype(str)),
    )
    adata.obsm["spatial"] = _cells[["x", "y"]].to_numpy(dtype=float)
    adata.obs[CLUSTER] = pd.Categorical(adata.obs[CLUSTER].astype(str))
    xy = np.asarray(adata.obsm["spatial"], dtype=float)
    radius = 0.05 * float(np.hypot(np.ptp(xy[:, 0]), np.ptp(xy[:, 1])))
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", n_neighs=64, key_added="spatial_knn"
    )
    sq.gr.spatial_neighbors(
        adata, coord_type="generic", radius=radius, key_added="spatial_radius"
    )

    return CLUSTER, adata


@app.cell
def _(CLUSTER, LandmarksWidget, adata, mo):
    widget = mo.ui.anywidget(LandmarksWidget(adata, color=CLUSTER))
    return (widget,)


@app.cell
def _(widget):
    widget
    return


@app.cell
def _(landmarks_to_geodataframe, widget):
    landmarks_gdf = landmarks_to_geodataframe(widget.landmarks)
    landmarks_gdf
    return (landmarks_gdf,)


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    ## Commit → reload

    Click the button to clear the widget and reload from the GeoDataFrame above.
    """)
    return


@app.cell
def _(mo):
    reload_btn = mo.ui.run_button(label="Reload from GeoDataFrame")
    reload_btn
    return (reload_btn,)


@app.cell
def _(geodataframe_to_landmarks, landmarks_gdf, mo, reload_btn, widget):
    mo.stop(not reload_btn.value)
    n_committed = len(landmarks_gdf)
    widget.clear_landmarks()
    widget.landmarks = geodataframe_to_landmarks(landmarks_gdf)
    {
        "committed": n_committed,
        "reloaded": len(widget.landmarks),
    }
    return


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    ## Neighborhood → selection

    Select a type or selection, turn on Radius/k-NN in the contextual toolbar,
    then click the make-selection icon on the L2 bar (same as
    `widget.promote_neighborhood_to_selection()`).
    """)
    return


if __name__ == "__main__":
    app.run()
