import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")


@app.cell
def _():
    import anndata as ad
    import marimo as mo
    import numpy as np

    from spatial_rx import LandmarksWidget, VolumeCubeWidget
    from spatial_rx.volume_cube import TOY_SHAPE_ZYX

    return LandmarksWidget, TOY_SHAPE_ZYX, VolumeCubeWidget, ad, mo, np


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
def _(TOY_SHAPE_ZYX, cube, mo):
    depth, height, width = TOY_SHAPE_ZYX
    x_slice = mo.ui.range_slider(
        0,
        width,
        value=[0, width],
        step=1,
        label="X slice (µm)",
        show_value=True,
    )
    y_slice = mo.ui.range_slider(
        0,
        height,
        value=[0, height],
        step=1,
        label="Y slice (µm)",
        show_value=True,
    )
    z_slice = mo.ui.range_slider(
        0,
        depth,
        value=[0, depth],
        step=1,
        label="Z slice (µm)",
        show_value=True,
    )
    return x_slice, y_slice, z_slice


@app.cell
def _(cube, mo):
    cube_ui = mo.ui.anywidget(cube)
    return (cube_ui,)


@app.cell
def _(cube, cube_ui, landmarks, mo, x_slice, y_slice, z_slice):
    cube.slice_x_min = float(x_slice.value[0])
    cube.slice_x_max = float(x_slice.value[1])
    cube.slice_y_min = float(y_slice.value[0])
    cube.slice_y_max = float(y_slice.value[1])
    cube.slice_z_min = float(z_slice.value[0])
    cube.slice_z_max = float(z_slice.value[1])
    if landmarks.inspect_cx is not None:
        cube.window_cx = float(landmarks.inspect_cx)
        cube.window_cy = float(landmarks.inspect_cy)
    return mo.vstack(
        [
            mo.hstack([landmarks, cube_ui], widths="equal"),
            mo.hstack([x_slice, y_slice, z_slice], widths="equal"),
        ],
        gap=1,
    )


if __name__ == "__main__":
    app.run()
