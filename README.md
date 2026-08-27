# spatial-rx

Tools for exploring spatial omics data in notebooks — reactive widgets that stay
in sync with your Python analysis.


| Tool | Role | Demo |
| ---- | ---- | ---- |
| **LandmarksWidget** | Draw selections and landmarks on tissue coordinates; measure from the notebook | [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/landmarks.py) |
| **GalleryWidget** | Compact card gallery (e.g. analysis recipes / use cases) | [![Open in molab](https://marimo.io/molab-shield.svg)](https://molab.marimo.io/github/ckmah/spatial-rx/blob/main/demos/gallery.py) |


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
line, spline, shape), with buffers and notebook-side masks via `get_indices`.

## GalleryWidget

![Gallery widget](assets/gallery_widget.png)

Selectable image cards for recipes or use cases. Synced selection is `selected_index`.
