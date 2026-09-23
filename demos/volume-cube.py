"""Landmarks inspect drives VolumeCube; Python reacts to window and slice state.

Default data: IDR Blin nuclear-segmentation OME-Zarr (idr0062) over HTTPS.
Offline / CI: set ``USE_TOY_VOLUME = True`` to use ``VolumeCubeWidget.toy()``.

GPU note: the Blin volume is 236 Z planes × 2 channels; the demo defaults to a
64-plane mid-Z slab and renders one channel in Viv to stay within GPU budget
alongside Landmarks.
"""

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")

# Offline fallback for CI / no-network environments (Playwright uses harness toy).
USE_TOY_VOLUME = False

@app.cell
def _():
    import anndata as ad
    import marimo as mo
    import numpy as np

    from spatial_rx import LandmarksWidget, VolumeCubeWidget
    from spatial_rx.volume_cube import (
        BLIN_IDR_IMAGE_URL,
        BLIN_SHAPE_ZYX,
        TOY_SHAPE_ZYX,
        cells_in_inspect_window,
    )

    return (
        BLIN_IDR_IMAGE_URL,
        BLIN_SHAPE_ZYX,
        LandmarksWidget,
        TOY_SHAPE_ZYX,
        VolumeCubeWidget,
        ad,
        cells_in_inspect_window,
        mo,
        np,
    )


@app.cell
def _(BLIN_IDR_IMAGE_URL, BLIN_SHAPE_ZYX, TOY_SHAPE_ZYX, VolumeCubeWidget, ad, np):
    if USE_TOY_VOLUME:
        cube = VolumeCubeWidget.toy()
        depth, height, width = TOY_SHAPE_ZYX
    else:
        cube = VolumeCubeWidget.from_url(
            BLIN_IDR_IMAGE_URL,
            labels_url="",
            shape_zyx=BLIN_SHAPE_ZYX,
        )
        depth, height, width = BLIN_SHAPE_ZYX

    rng = np.random.default_rng(0)
    xy = np.column_stack(
        [
            rng.uniform(20, width - 20, 600),
            rng.uniform(20, height - 20, 600),
        ]
    )
    adata = ad.AnnData(np.zeros((xy.shape[0], 1), dtype=np.float32))
    adata.obsm["spatial"] = xy
    return adata, cube, depth, height, width


@app.cell
def _(LandmarksWidget, adata, mo):
    landmarks = mo.ui.anywidget(LandmarksWidget(adata))
    return (landmarks,)


@app.cell
def _(cube, depth, height, mo, width):
    x_slice = mo.ui.range_slider(
        0,
        width,
        value=[int(cube.slice_x_min), int(cube.slice_x_max)],
        step=1,
        label="X slice (voxel)",
        show_value=True,
    )
    y_slice = mo.ui.range_slider(
        0,
        height,
        value=[int(cube.slice_y_min), int(cube.slice_y_max)],
        step=1,
        label="Y slice (voxel)",
        show_value=True,
    )
    z_slice = mo.ui.range_slider(
        0,
        depth,
        value=[int(cube.slice_z_min), int(cube.slice_z_max)],
        step=1,
        label="Z slice (voxel)",
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


@app.cell
def _(adata, cells_in_inspect_window, cube, landmarks, mo):
    if landmarks.inspect_cx is None:
        analysis = mo.md(
            "Click **Inspect** on tissue to drive the cube window and run analysis."
        )
    else:
        mask = cells_in_inspect_window(
            adata.obsm["spatial"],
            landmarks.inspect_cx,
            landmarks.inspect_cy,
            landmarks.inspect_size_um,
        )
        n_cells = int(mask.sum())
        analysis = mo.md(
            f"**{n_cells}** synthetic cells inside the {landmarks.inspect_size_um:g} "
            f"inspect window at ({landmarks.inspect_cx:.0f}, {landmarks.inspect_cy:.0f}) "
            f"· cube Z {cube.slice_z_min:.0f}–{cube.slice_z_max:.0f}"
        )
    return (analysis,)


@app.cell
def _(analysis):
    analysis
    return


if __name__ == "__main__":
    app.run()
