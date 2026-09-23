"""Luxar explore/share viewer for the synthetic 3D blobs SpatialData fixture."""

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")


@app.cell
def _():
    import marimo as mo

    from spatial_rx.blobs_3d import blobs_3d
    from spatial_rx.luxar_scene import luxar_supported, to_luxar_zarr
    from spatial_rx.luxar_viewer import view_luxar_zarr

    return blobs_3d, luxar_supported, mo, to_luxar_zarr, view_luxar_zarr


@app.cell(hide_code=True)
def _(luxar_supported, mo):
    if not luxar_supported():
        mo.stop(
            mo.callout(
                "Luxar requires Python 3.12+ and `pip install 'spatial-rx[luxar]'`. "
                "Image splats additionally need `pip install 'spatial-rx[luxar-gsplats]'`.",
                kind="warn",
            )
        )
    mo.md("""
    # Luxar blobs (3D)

    Parallel explore/share viewer for SpatialData — separate from VolumeCube/Viv.
    **Compile** the synthetic ``blobs_3d`` fixture to ``.luxar.zarr`` in Python,
    then **view** the served archive in the widget (no fitting inside the widget).
    """)
    return


@app.cell
def _(blobs_3d, to_luxar_zarr, view_luxar_zarr):
    import tempfile
    from pathlib import Path

    sdata = blobs_3d(length=48, n_points=60, n_shapes=4, seed=0)
    dest = Path(tempfile.mkdtemp()) / "blobs3d.luxar.zarr"
    to_luxar_zarr(sdata, dest, include_gsplats=False)
    widget = view_luxar_zarr(dest)
    return dest, sdata, widget


@app.cell
def _(mo, widget):
    mo.ui.anywidget(widget)
    return


if __name__ == "__main__":
    app.run()
