# spatial-rx

Tools for exploring spatial omics data in notebooks — reactive widgets that stay  
in sync with your Python analysis.


| Tool                | Role                                                                           |
| ------------------- | ------------------------------------------------------------------------------ |
| **LandmarksWidget** | Draw selections and landmarks on tissue coordinates; measure from the notebook |
| **GalleryWidget**   | Compact card gallery (e.g. analysis recipes / use cases)                       |


More widgets and helpers may land here over time.

## Install

```bash
uv sync
```

## LandmarksWidget

An [anywidget](https://anywidget.dev/) for spatial coordinates: top tool bar, left
sidebar, drawing-only synced state.

- **Selections** — lasso, rectangle, rotatable ellipse
- **Landmarks** — point, line, spline, shape
- **Layer tools** — spline tension; directional buffer on lines/splines (`left` / `both` / `right`)

Use `get_mask` / `get_indices(selection_id=...)` to restrict points. Distance,
composition, gradient, and other tables belong in the notebook.

### Matplotlib (static figure)

```python
from spatial_rx import LandmarksWidget

w = LandmarksWidget(fig)
idx = w.get_indices(x, y, selection_id="selection 1")
```

### Scatter (pan / zoom)

Interactive points use [regl-scatterplot](https://github.com/flekschas/regl-scatterplot)
(same WebGL engine as [jupyter-scatter](https://github.com/flekschas/jupyter-scatter)).
In **Pan/Zoom** mode, navigate the scatter; switch to lasso / landmark tools to draw.

```python
from spatial_rx import LandmarksWidget

w = LandmarksWidget.from_points(x, y, color=cell_type, width=900, height=900)
w.set_color(gene_expression)  # update colors without rebuilding
idx = w.get_indices(x, y, selection_id="selection 1")
```

## Demos

- `demos/landmarks.py` — spatial transcriptomics playground (TIFF/CSV under `demos/data/`)
  [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/landmarks.py)

### Showcase notebook

Project env (recommended while developing this repo):

```bash
uv sync
uv run marimo edit --no-sandbox demos/landmarks.py
```

Sandboxed env (PEP 723; local `spatial-rx` via `[tool.uv.sources]`):

```bash
uv run marimo edit --sandbox demos/landmarks.py
```

