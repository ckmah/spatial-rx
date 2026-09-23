"""Luxar explore/share viewer for the synthetic 3D blobs SpatialData fixture."""

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")


@app.cell
def _():
    import marimo as mo

    from spatial_rx.blobs_3d import blobs_3d
    from spatial_rx.luxar_viewer import LuxarWidget, luxar_supported

    return LuxarWidget, blobs_3d, luxar_supported, mo


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
    This demo compiles points, shape meshes, label isosurfaces, and (optionally)
    image Gaussian splats from the synthetic ``blobs_3d`` fixture.
    """)
    return


@app.cell
def _(LuxarWidget, blobs_3d):
    sdata = blobs_3d(length=48, n_points=60, n_shapes=4, seed=0)
    widget = LuxarWidget.from_spatialdata(sdata, include_gsplats=False)
    return sdata, widget


@app.cell
def _(mo, widget):
    mo.ui.anywidget(widget)
    return


if __name__ == "__main__":
    app.run()
