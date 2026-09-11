# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "marimo",
#     "geopandas",
#     "pyarrow",
#     "spatial-rx[polyrender]",
# ]
# ///

import marimo

__generated_with = "0.24.0"
app = marimo.App(width="full")


@app.cell(hide_code=True)
def _(mo):
    mo.md(
        r"""
    # PolyrenderWidget

    Meshify stacked 2D outlines into GLB tiles and stream them in a Soft Float /
    React Three Fiber viewer. Sample data is a small liver crop (~50 cells).
    """
    )
    return


@app.cell
def _():
    import pathlib
    import tempfile
    import urllib.parse
    import urllib.request

    import geopandas as gpd
    import marimo as mo
    from spatial_rx import plot

    parquet_url = pathlib.Path(__file__).parent / "data" / "polyrender" / "liver_crop_sample.parquet"
    if not parquet_url.is_file():
        parquet_url = (
            "https://huggingface.co/datasets/ckmah/polyrender/resolve/"
            "92678be92f8e0b06fc2a32b53885c4fdf3419ee3/liver_crop_sample.parquet"
        )

    scheme = urllib.parse.urlparse(str(parquet_url)).scheme.lower()
    if scheme in {"http", "https"}:
        with urllib.request.urlopen(str(parquet_url), timeout=120) as response:
            with tempfile.TemporaryDirectory() as temp_dir:
                path = pathlib.Path(temp_dir) / "dataset.parquet"
                path.write_bytes(response.read())
                gdf = gpd.read_parquet(path)
    else:
        gdf = gpd.read_parquet(parquet_url)

    viewer = mo.ui.anywidget(plot(gdf, on_demand=True, smooth=False, show_progress=False))
    return gdf, mo, viewer


@app.cell
def _(mo, viewer):
    viewer
    return


if __name__ == "__main__":
    app.run()
