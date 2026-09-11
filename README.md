# spatial-rx

Tools for exploring spatial omics data in notebooks — reactive widgets that stay
in sync with your Python analysis.


| Tool | Role | Demo |
| ---- | ---- | ---- |
| **LandmarksWidget** | Draw selections and landmarks on tissue coordinates; measure from the notebook | [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/landmarks.py) |
| **GalleryWidget** | Compact card gallery (e.g. analysis recipes / use cases) | [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/gallery.py) |
| **PolyrenderWidget** | Soft Float + Fiber viewer for meshified 2.5D cell stacks (`meshify` / `plot`) | [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/polyrender.py) |


More widgets and helpers may land here over time.

## Install

```bash
pip install spatial-rx
```

From source:

```bash
uv sync --extra demo --group dev
```

## LandmarksWidget

![Landmarks widget](assets/landmarks_widget.png)

Draw selections and landmarks on tissue coordinates (lasso, rectangle, ellipse; point,
line, spline, shape). Format data as `AnnData` with `obsm["spatial"]` and squidpy
neighbor graphs, then `LandmarksWidget(adata, color=..., genes=...)`. Persist
hits with `get_obs_names`.

## GalleryWidget

![Gallery widget](assets/gallery_widget.png)

Selectable image cards for recipes or use cases. Synced selection is `selected_index`.

## PolyrenderWidget

Meshify stacked segmentation outlines (`cell_id`, `ZIndex`, `geometry`) into GLB
tiles and stream them in a Soft Float / React Three Fiber viewer. Heavy mesh
deps are optional:

```bash
uv sync --extra polyrender
# or with demos
uv sync --extra demo
```

```python
from spatial_rx import meshify, plot

info = meshify(gdf)          # writes .polyrender/<hash>/tiles.json + GLBs
widget = plot(gdf, on_demand=True)
```

Demo: `demos/polyrender.py`.
