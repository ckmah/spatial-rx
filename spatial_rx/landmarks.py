"""LandmarksWidget: draw selections and landmarks on a matplotlib chart."""

from __future__ import annotations

import math
from pathlib import Path
from typing import TYPE_CHECKING, Any

import traitlets
from anywidget import AnyWidget

from .chart import extract_axes_info, fig_to_base64

if TYPE_CHECKING:
    import numpy as np

_DEFAULT_MODES = [
    "select",
    "lasso",
    "point",
    "line",
    "spline",
    "shape",
]


class LandmarksWidget(AnyWidget):
    """Draw selections and landmarks on a matplotlib chart.

    Synced state is UI-only (``landmarks``, ``selections``, edit highlight).
    Use ``get_mask`` / ``get_indices`` with an explicit ``selection_id``
    (or ``\"all\"`` for every point). Measurement tables belong in the notebook.

    Line and spline landmarks carry ``buffer_width`` (data units, ``0`` = off)
    and ``buffer_side`` (``\"left\"``/``\"both\"``/``\"right\"``, relative to the
    drawing direction) so notebooks can rebuild the band with
    ``shapely.LineString(...).buffer(width, single_sided=True)``.

    Examples:
        ```python
        w = LandmarksWidget(fig)
        idx = w.get_indices(x, y, selection_id="selection 1")
        idx_all = w.get_indices(x, y)  # all points
        ```
    """

    _esm = Path(__file__).parent / "static" / "landmarks.js"
    _css = Path(__file__).parent / "static" / "landmarks.css"

    mode = traitlets.Unicode("select").tag(sync=True)
    modes = traitlets.List(traitlets.Unicode(), default_value=list(_DEFAULT_MODES)).tag(
        sync=True
    )

    selections = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    landmarks = traitlets.List(traitlets.Dict(), default_value=[]).tag(sync=True)
    selected_kind = traitlets.Unicode("").tag(sync=True)
    selected_index = traitlets.Int(-1).tag(sync=True)

    x_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    y_bounds = traitlets.Tuple(
        traitlets.Float(), traitlets.Float(), default_value=(0.0, 1.0)
    ).tag(sync=True)
    axes_pixel_bounds = traitlets.Tuple(
        traitlets.Float(),
        traitlets.Float(),
        traitlets.Float(),
        traitlets.Float(),
        default_value=(0.0, 0.0, 100.0, 100.0),
    ).tag(sync=True)

    width = traitlets.Int(400).tag(sync=True)
    height = traitlets.Int(400).tag(sync=True)
    chart_base64 = traitlets.Unicode("").tag(sync=True)

    landmark_opacity = traitlets.Float(0.25).tag(sync=True)
    stroke_width = traitlets.Int(2).tag(sync=True)
    default_tension = traitlets.Float(0.0).tag(sync=True)
    default_buffer_width = traitlets.Float(0.0).tag(sync=True)
    default_buffer_side = traitlets.Enum(
        ["left", "both", "right"], default_value="both"
    ).tag(sync=True)

    def __init__(
        self,
        fig: Any,
        mode: str = "select",
        modes: list[str] | None = None,
        landmark_opacity: float = 0.25,
        default_tension: float = 0.0,
        default_buffer_width: float = 0.0,
        default_buffer_side: str = "both",
        **kwargs: Any,
    ) -> None:
        x_bounds, y_bounds, axes_pixel_bounds, width_px, height_px, x_scale, y_scale = (
            extract_axes_info(fig)
        )
        chart_base64 = fig_to_base64(fig)
        self._x_scale = x_scale
        self._y_scale = y_scale

        if x_scale == "log":
            x_bounds = (math.log10(x_bounds[0]), math.log10(x_bounds[1]))
        if y_scale == "log":
            y_bounds = (math.log10(y_bounds[0]), math.log10(y_bounds[1]))

        if modes is None:
            modes = list(_DEFAULT_MODES)

        super().__init__(
            mode=mode,
            modes=modes,
            x_bounds=x_bounds,
            y_bounds=y_bounds,
            axes_pixel_bounds=axes_pixel_bounds,
            width=width_px,
            height=height_px,
            chart_base64=chart_base64,
            landmark_opacity=landmark_opacity,
            default_tension=default_tension,
            default_buffer_width=default_buffer_width,
            default_buffer_side=default_buffer_side,
            **kwargs,
        )

    def _to_display(self, x, y):
        if self._x_scale == "log":
            x = math.log10(x)
        if self._y_scale == "log":
            y = math.log10(y)
        return x, y

    def clear_selections(self) -> None:
        self.selections = []
        if self.selected_kind == "selection":
            self.selected_kind = ""
            self.selected_index = -1

    def clear_landmarks(self) -> None:
        self.landmarks = []
        if self.selected_kind == "landmark":
            self.selected_kind = ""
            self.selected_index = -1

    def clear(self) -> None:
        self.clear_selections()
        self.clear_landmarks()

    def _selection_by_id(self, selection_id: str) -> dict | None:
        for sel in self.selections:
            if str(sel.get("id")) == str(selection_id):
                return sel
        return None

    def _selection_display_vertices(self, selection: dict) -> list[tuple[float, float]]:
        """Closed ring of selection vertices in display (widget) coordinates."""
        kind = selection.get("type")
        if kind in ("polygon", "lasso"):
            verts = selection.get("vertices") or []
            if len(verts) < 3:
                return []
            return [(float(v[0]), float(v[1])) for v in verts]

        if kind == "rectangle":
            cx = float(selection["cx"])
            cy = float(selection["cy"])
            w = float(selection["width"])
            h = float(selection["height"])
            angle = float(selection.get("angle") or 0.0)
            corners = [
                (cx - w / 2, cy - h / 2),
                (cx + w / 2, cy - h / 2),
                (cx + w / 2, cy + h / 2),
                (cx - w / 2, cy + h / 2),
            ]
            if abs(angle) < 1e-12:
                return corners
            cos_a, sin_a = math.cos(angle), math.sin(angle)
            out = []
            for x, y in corners:
                dx, dy = x - cx, y - cy
                out.append((cx + dx * cos_a - dy * sin_a, cy + dx * sin_a + dy * cos_a))
            return out

        if kind == "ellipse":
            cx = float(selection["cx"])
            cy = float(selection["cy"])
            rx = float(selection["rx"])
            ry = float(selection["ry"])
            angle = float(selection.get("angle") or 0.0)
            cos_a, sin_a = math.cos(angle), math.sin(angle)
            n = 64
            out = []
            for i in range(n):
                t = 2 * math.pi * i / n
                x = rx * math.cos(t)
                y = ry * math.sin(t)
                out.append((cx + x * cos_a - y * sin_a, cy + x * sin_a + dy * cos_a))
            return out

        return []

    def get_mask(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
    ) -> "np.ndarray":
        """Boolean mask for points inside ``selection_id`` (all-True for ``\"all\"``/None)."""
        import numpy as np
        from matplotlib.path import Path as MplPath

        x_arr = np.asarray(x_arr, dtype=float)
        y_arr = np.asarray(y_arr, dtype=float)
        if selection_id is None or selection_id == "all":
            return np.ones(len(x_arr), dtype=bool)

        sel = self._selection_by_id(selection_id)
        if sel is None:
            return np.zeros(len(x_arr), dtype=bool)

        verts = self._selection_display_vertices(sel)
        if len(verts) < 3:
            return np.zeros(len(x_arr), dtype=bool)

        x_d = np.log10(x_arr) if self._x_scale == "log" else x_arr
        y_d = np.log10(y_arr) if self._y_scale == "log" else y_arr
        path = MplPath(verts)
        return path.contains_points(np.column_stack([x_d, y_d]))

    def get_indices(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
    ) -> "np.ndarray":
        """Indices of points inside ``selection_id`` (all indices for ``\"all\"``/None)."""
        import numpy as np

        return np.where(self.get_mask(x_arr, y_arr, selection_id=selection_id))[0]
