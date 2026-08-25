# spatial-rx

Draw **selections** and **landmarks** on a matplotlib chart or an interactive WebGL scatter, then measure them from a notebook.

`LandmarksWidget` is an [anywidget](https://anywidget.dev/) with a top tool bar and a left sidebar:

- **Selections** — lasso, polygon, rectangle, rotatable ellipse
- **Landmarks** — point, line, spline, shape
- **Layer tools** — spline tension; directional buffer on lines/splines (`left` / `both` / `right`)

Synced state is drawing-only. Use `get_mask` / `get_indices(selection_id=...)` to restrict points. Distance, composition, and gradient tables belong in the notebook.

## Matplotlib (static figure)

```python
from spatial_rx import LandmarksWidget

w = LandmarksWidget(fig)
idx = w.get_indices(x, y, selection_id="selection 1")
```

## Scatter (pan / zoom)

Interactive points use [regl-scatterplot](https://github.com/flekschas/regl-scatterplot) — the same WebGL engine as [jupyter-scatter](https://github.com/flekschas/jupyter-scatter). In **Pan/Zoom** mode, navigate the scatter; switch to lasso / landmark tools to draw.

```python
from spatial_rx import LandmarksWidget

w = LandmarksWidget.from_points(x, y, color=cell_type, width=900, height=900)
w.set_color(gene_expression)  # update colors without rebuilding
idx = w.get_indices(x, y, selection_id="selection 1")
```

Demos:
- `demos/landmarks.py` — synthetic matplotlib landmarks
- `demos/scatter_landmarks.py` — synthetic WebGL scatter landmarks
- `demos/landmarks_showcase.py` — spatial transcriptomics playground (TIFF/CSV under `demos/data/`)

## Run the showcase notebook

From the repo root, either use the **project** env (recommended while developing `spatial-rx`):

```bash
uv sync
uv run marimo edit demos/landmarks_showcase.py
# answer n when asked about sandboxing, or:
uv run marimo edit --no-sandbox demos/landmarks_showcase.py
```

Or use the notebook’s **sandboxed** env (PEP 723). The header pins local `spatial-rx` via `[tool.uv.sources]`:

```bash
uv run marimo edit --sandbox demos/landmarks_showcase.py
```

