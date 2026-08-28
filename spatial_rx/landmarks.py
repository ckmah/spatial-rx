"""LandmarksWidget: draw selections and landmarks on a deck.gl point scatter."""

from __future__ import annotations

import base64
import math
from typing import TYPE_CHECKING, Any

import traitlets
from anywidget import AnyWidget

from ._assets import vanilla_css, vanilla_esm
from .selection import selection_mask

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

_DEFAULT_PALETTE = [
    "#00e5ff",
    "#ff2d95",
    "#b8ff00",
    "#ffb000",
    "#7c4dff",
    "#00ffa3",
    "#38bdf8",
    "#f472b6",
    "#a3e635",
    "#fb923c",
]


def _sequential_palette(
    n: int = 256,
    low: str = "#e5e7eb",
    high: str = "#b91c1c",
) -> list[str]:
    """Sample a two-stop sequential colormap to hex colors (low → high)."""
    import matplotlib.colors as mcolors

    cmap = mcolors.LinearSegmentedColormap.from_list("seq", [low, high], N=max(n, 2))
    if n <= 1:
        return [mcolors.to_hex(cmap(0.5))]
    return [mcolors.to_hex(cmap(i / (n - 1))) for i in range(n)]


def _encode_f32(arr: "np.ndarray") -> str:
    import numpy as np

    return base64.b64encode(np.asarray(arr, dtype=np.float32).tobytes()).decode("ascii")


def _encode_colors(
    color: Any,
    color_map: dict[str, str] | None,
    n: int,
    *,
    continuous_range: tuple[str, str] | None = None,
) -> tuple[list[str], "np.ndarray", list[str], float | None, float | None]:
    """Return (palette_hex, valueA, legend_labels, vmin, vmax).

    Categorical: valueA is category index. When ``color_map`` is given, legend
    order follows ``color_map`` key order (then any unmapped labels).
    Continuous: valueA in [0, 1] with a sequential palette (default light grey→red).
    """
    import numpy as np

    if color is None:
        return ["#60a5fa"], np.zeros(n, dtype=np.float32), [], None, None

    if isinstance(color, str):
        return [color], np.zeros(n, dtype=np.float32), [], None, None

    color_arr = np.asarray(color)
    if color_arr.shape[0] != n:
        raise ValueError(f"color length {color_arr.shape[0]} != n_points {n}")

    if color_arr.dtype.kind in "UOS":
        seen = [str(c) for c in dict.fromkeys(color_arr.tolist())]
        if color_map:
            present = set(seen)
            cats = [str(c) for c in color_map.keys() if str(c) in present]
            cats.extend(c for c in seen if c not in cats)
            palette = [
                color_map.get(c, _DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)])
                for i, c in enumerate(cats)
            ]
        else:
            cats = seen
            palette = [_DEFAULT_PALETTE[i % len(_DEFAULT_PALETTE)] for i in range(len(cats))]
        cat_to_i = {c: float(i) for i, c in enumerate(cats)}
        idx = np.asarray(
            [cat_to_i[str(c)] for c in color_arr.tolist()], dtype=np.float32
        )
        return palette, idx, cats, None, None

    low, high = continuous_range or ("#e5e7eb", "#b91c1c")
    seq = _sequential_palette(256, low=low, high=high)
    vals = color_arr.astype(np.float64)
    finite = vals[np.isfinite(vals)]
    if finite.size == 0:
        return seq, np.zeros(n, dtype=np.float32), [], 0.0, 1.0
    vmin = float(np.nanmin(finite))
    vmax = float(np.nanpercentile(finite, 99))
    if not math.isfinite(vmax) or vmax <= vmin:
        vmax = float(np.nanmax(finite))
    if not math.isfinite(vmax) or vmax <= vmin:
        vmax = vmin + 1.0
    norm = ((vals - vmin) / (vmax - vmin)).astype(np.float32)
    norm = np.clip(np.nan_to_num(norm, nan=0.0), 0.0, 1.0)
    return seq, norm, [], vmin, vmax


class LandmarksWidget(AnyWidget):
    """Draw selections and landmarks as deck.gl layers on an orthographic scatter.

    ``LandmarksWidget.from_points(x, y, color=...)`` builds a pan/zoom scatter
    in cartesian tissue coordinates; landmarks and selections are deck.gl layers.

    Synced state is UI-only (``landmarks``, ``selections``, edit highlight).
    Use ``get_mask`` / ``get_indices`` with an explicit ``selection_id``
    (or ``\"all\"`` for every point). Measurement tables belong in the notebook.

    Line and spline landmarks carry ``buffer_width`` (data units, ``0`` = off)
    and ``buffer_side`` (``\"left\"``/``\"both\"``/``\"right\"``, relative to the
    drawing direction) so notebooks can rebuild the band with
    ``shapely.LineString(...).buffer(width, single_sided=True)``.
    """

    _esm = vanilla_esm("landmarks")
    _css = vanilla_css("landmarks")

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

    points_data = traitlets.Unicode("").tag(sync=True)  # base64 float32 Nx4
    point_palette = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    color_by = traitlets.Unicode("categorical").tag(sync=True)  # categorical | continuous
    legend_labels = traitlets.List(traitlets.Unicode(), default_value=[]).tag(sync=True)
    legend_title = traitlets.Unicode("").tag(sync=True)
    color_vmin = traitlets.Float(0.0).tag(sync=True)
    color_vmax = traitlets.Float(1.0).tag(sync=True)
    point_size = traitlets.Float(2.0).tag(sync=True)
    point_opacity = traitlets.Float(0.75).tag(sync=True)
    plot_background = traitlets.Unicode("").tag(sync=True)

    landmark_opacity = traitlets.Float(0.28).tag(sync=True)
    stroke_width = traitlets.Int(4).tag(sync=True)
    default_tension = traitlets.Float(0.0).tag(sync=True)
    default_buffer_width = traitlets.Float(0.0).tag(sync=True)
    default_buffer_side = traitlets.Enum(
        ["left", "both", "right"], default_value="both"
    ).tag(sync=True)

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        raise TypeError("Use LandmarksWidget.from_points(x, y, ...)")

    @classmethod
    def from_points(
        cls,
        x: Any,
        y: Any,
        *,
        color: Any = None,
        color_map: dict[str, str] | None = None,
        continuous_range: tuple[str, str] | None = None,
        width: int = 900,
        height: int = 900,
        point_size: float = 2.0,
        point_opacity: float = 0.75,
        background: str | None = None,
        legend_title: str = "",
        mode: str = "select",
        modes: list[str] | None = None,
        landmark_opacity: float = 0.28,
        stroke_width: int = 4,
        default_tension: float = 0.0,
        default_buffer_width: float = 0.0,
        default_buffer_side: str = "both",
        **kwargs: Any,
    ) -> "LandmarksWidget":
        """Build a pan/zoom deck.gl scatter with landmark and selection layers.

        ``width`` / ``height`` size the widget shell in CSS pixels. The figure
        panel expands to fill the remaining viewport beside the sidebar (not
        forced square); canvases sync to that laid-out size. ``background``
        defaults to the widget chrome color so the scatter matches the rest of
        the UI. ``point_size`` is marker radius in the same units as ``x`` /
        ``y`` (e.g. 2.0 for a 2 µm radius on micron coordinates); screen size
        scales with zoom and is not clamped to a minimum pixel size.
        """
        import numpy as np

        x_arr = np.asarray(x, dtype=np.float64).ravel()
        y_arr = np.asarray(y, dtype=np.float64).ravel()
        if x_arr.shape != y_arr.shape:
            raise ValueError("x and y must have the same shape")
        n = int(x_arr.shape[0])
        if n == 0:
            raise ValueError("x and y must be non-empty")

        xmin, xmax = float(x_arr.min()), float(x_arr.max())
        ymin, ymax = float(y_arr.min()), float(y_arr.max())
        if xmax <= xmin:
            xmax = xmin + 1.0
        if ymax <= ymin:
            ymax = ymin + 1.0
        pad_x = 0.02 * (xmax - xmin)
        pad_y = 0.02 * (ymax - ymin)
        xmin, xmax = xmin - pad_x, xmax + pad_x
        ymin, ymax = ymin - pad_y, ymax + pad_y

        nx = (2.0 * (x_arr - xmin) / (xmax - xmin) - 1.0).astype(np.float32)
        ny = (2.0 * (y_arr - ymin) / (ymax - ymin) - 1.0).astype(np.float32)
        palette, value_a, labels, vmin, vmax = _encode_colors(
            color, color_map, n, continuous_range=continuous_range
        )
        color_mode = (
            "categorical"
            if color is None
            or isinstance(color, str)
            or np.asarray(color).dtype.kind in "UOS"
            else "continuous"
        )
        points = np.column_stack(
            [nx, ny, value_a, np.zeros(n, dtype=np.float32)]
        )

        if modes is None:
            modes = list(_DEFAULT_MODES)

        self = cls.__new__(cls)
        self._x_scale = "linear"
        self._y_scale = "linear"
        self._data_x = x_arr
        self._data_y = y_arr
        AnyWidget.__init__(
            self,
            mode=mode,
            modes=modes,
            x_bounds=(xmin, xmax),
            y_bounds=(ymin, ymax),
            axes_pixel_bounds=(0.0, 0.0, float(width), float(height)),
            width=int(width),
            height=int(height),
            points_data=_encode_f32(points),
            point_palette=list(palette),
            color_by=color_mode,
            legend_labels=list(labels),
            legend_title=legend_title,
            color_vmin=float(vmin if vmin is not None else 0.0),
            color_vmax=float(vmax if vmax is not None else 1.0),
            point_size=float(point_size),
            point_opacity=float(point_opacity),
            plot_background=background or "",
            landmark_opacity=landmark_opacity,
            stroke_width=stroke_width,
            default_tension=default_tension,
            default_buffer_width=default_buffer_width,
            default_buffer_side=default_buffer_side,
            **kwargs,
        )
        return self

    def set_points(
        self,
        x: Any,
        y: Any,
        *,
        color: Any = None,
        color_map: dict[str, str] | None = None,
        legend_title: str | None = None,
        continuous_range: tuple[str, str] | None = None,
    ) -> None:
        """Replace scatter points/colors."""
        import numpy as np

        x_arr = np.asarray(x, dtype=np.float64).ravel()
        y_arr = np.asarray(y, dtype=np.float64).ravel()
        if x_arr.shape != y_arr.shape:
            raise ValueError("x and y must have the same shape")
        n = int(x_arr.shape[0])
        xmin, xmax = self.x_bounds
        ymin, ymax = self.y_bounds
        nx = (2.0 * (x_arr - xmin) / (xmax - xmin) - 1.0).astype(np.float32)
        ny = (2.0 * (y_arr - ymin) / (ymax - ymin) - 1.0).astype(np.float32)
        palette, value_a, labels, vmin, vmax = _encode_colors(
            color, color_map, n, continuous_range=continuous_range
        )
        color_mode = (
            "categorical"
            if color is None
            or isinstance(color, str)
            or np.asarray(color).dtype.kind in "UOS"
            else "continuous"
        )
        points = np.column_stack([nx, ny, value_a, np.zeros(n, dtype=np.float32)])
        self._data_x = x_arr
        self._data_y = y_arr
        self.point_palette = list(palette)
        self.color_by = color_mode
        self.legend_labels = list(labels)
        if legend_title is not None:
            self.legend_title = legend_title
        self.color_vmin = float(vmin if vmin is not None else 0.0)
        self.color_vmax = float(vmax if vmax is not None else 1.0)
        self.points_data = _encode_f32(points)

    def set_color(
        self,
        color: Any,
        *,
        color_map: dict[str, str] | None = None,
        legend_title: str | None = None,
        continuous_range: tuple[str, str] | None = None,
    ) -> None:
        """Update point colors without changing x/y."""
        x = getattr(self, "_data_x", None)
        y = getattr(self, "_data_y", None)
        if x is None or y is None:
            raise RuntimeError("internal point cache missing; call set_points first")
        self.set_points(
            x,
            y,
            color=color,
            color_map=color_map,
            legend_title=legend_title,
            continuous_range=continuous_range,
        )

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

    def get_mask(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
    ) -> "np.ndarray":
        """Boolean mask for points inside ``selection_id`` (all-True for ``\"all\"``/None)."""
        return selection_mask(
            list(self.selections),
            x_arr,
            y_arr,
            selection_id,
            x_scale=self._x_scale,
            y_scale=self._y_scale,
        )

    def get_indices(
        self,
        x_arr: Any,
        y_arr: Any,
        selection_id: str | None = "all",
    ) -> "np.ndarray":
        """Indices of points inside ``selection_id`` (all indices for ``\"all\"``/None)."""
        import numpy as np

        return np.where(self.get_mask(x_arr, y_arr, selection_id=selection_id))[0]
