# spatial-rx

Draw **selections** and **landmarks** on a matplotlib chart, then measure them from a notebook.

`LandmarksWidget` is an [anywidget](https://anywidget.dev/) with a top tool bar and a left sidebar:

- **Selections** — lasso, polygon, rectangle, rotatable ellipse
- **Landmarks** — point, line, spline, shape
- **Layer tools** — spline tension; directional buffer on lines/splines (`left` / `both` / `right`)

Synced state is drawing-only. Use `get_mask` / `get_indices(selection_id=...)` to restrict points. Distance, composition, and gradient tables belong in the notebook.

```python
from spatial_rx import LandmarksWidget

w = LandmarksWidget(fig)
idx = w.get_indices(x, y, selection_id="selection 1")
idx_all = w.get_indices(x, y)  # all points
```

Demo notebook: `demos/landmarks.py`.
