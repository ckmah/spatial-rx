import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")


@app.cell
def _():
    import anndata as ad
    import marimo as mo
    import numpy as np

    from spatial_rx import LandmarksWidget, VolumeCubeWidget

    return LandmarksWidget, VolumeCubeWidget, ad, mo, np


@app.cell
def _(VolumeCubeWidget, ad, np):
    cube = VolumeCubeWidget.toy()
    xy = np.random.default_rng(0).uniform(20, 236, size=(600, 2))
    adata = ad.AnnData(np.zeros((xy.shape[0], 1), dtype=np.float32))
    adata.obsm["spatial"] = xy
    return adata, cube


@app.cell
def _(LandmarksWidget, adata, mo):
    landmarks = mo.ui.anywidget(LandmarksWidget(adata))
    return (landmarks,)


@app.cell
def _(cube, mo):
    cube_ui = mo.ui.anywidget(cube)
    return (cube_ui,)


@app.cell
def _(cube, cube_ui, landmarks, mo):
    if landmarks.inspect_cx is not None:
        cube.window_cx = float(landmarks.inspect_cx)
        cube.window_cy = float(landmarks.inspect_cy)
    return mo.hstack([landmarks, cube_ui], widths="equal")


if __name__ == "__main__":
    app.run()
