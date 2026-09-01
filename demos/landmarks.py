import marimo

__generated_with = "0.24.0"
app = marimo.App(width="medium")


@app.cell
def _():
    from pathlib import Path

    import marimo as mo
    import polars as pl
    import spatial_rx
    from spatial_rx import LandmarksWidget

    return LandmarksWidget, Path, mo, pl, spatial_rx


@app.cell(hide_code=True)
def _(mo):
    mo.md(r"""
    # Cell-set neighborhood

    Seed a **set of cells** from a lasso or a category value, then expand with radius or k-NN like a landmark buffer.

    - **Layers** and **Tools** are floating panels (top bar stays fixed).
    - **Categories** lists every categorical column; expand a column, click a value to select it.
    - Neighborhood expand uses a **precomputed neighbor graph** (pynndescent); the browser only looks up CSR rows.
    - Radius viz is a **GPU scatter halo** around seeds (transparent disks), not a polygon union.
    - `widget.get_type_indices("Epithelial")` includes neighbors when expansion is on.
    """)
    return


@app.cell
def _(LandmarksWidget, Path, pl, spatial_rx):
    _path = Path(spatial_rx.__file__).resolve().parents[1] / "demos" / "data" / "ileum" / "cells.csv"
    gut_xy = pl.read_csv(_path)
    CLASS_COLORS = {
        "Epithelial": "#4c78a8",
        "Immune": "#e45756",
        "Fibroblast": "#72b7b2",
        "Smooth Muscle": "#f58518",
        "Endothelial": "#54a24b",
        "ENS": "#b279a2",
        "Interstitial": "#9d755d",
    }
    widget = LandmarksWidget.from_frame(
        gut_xy,
        color="cell_class",
        color_maps={"cell_class": CLASS_COLORS},
        width=1100,
        height=700,
        point_size=2.0,
        point_opacity=0.8,
        k_max=64,
        neighbor_radius_max=200.0,
    )
    widget
    return


@app.cell
def _():
    return


if __name__ == "__main__":
    app.run()
