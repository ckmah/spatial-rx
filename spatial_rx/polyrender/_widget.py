"""PolyrenderWidget: Soft Float chrome over a React Three Fiber tile viewer."""

from __future__ import annotations

from typing import Any

import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import widget_css, widget_esm


class PolyrenderWidget(AnyWidget):
    """Streaming 3D cross-section viewer backed by GLB tile files.

    Traitlets mirror the stable tiles.json / tile-server contract from the
    standalone polyrender package. Browser chrome is Soft Float + shadcn;
    the canvas engine is React Three Fiber (``TileManager``).
    """

    _esm = widget_esm("polyrender")
    _css = widget_css()

    tile_server_url = traitlets.Unicode("").tag(sync=True)
    tiles_json_path = traitlets.Unicode("tiles.json").tag(sync=True)
    bbox = traitlets.List(trait=traitlets.Float()).tag(sync=True)
    color = traitlets.Unicode("#4aa3ff").tag(sync=True)
    max_concurrent_fetches = traitlets.Int(4).tag(sync=True)
    # Base64-encoded packed float32 XY pairs: [x0,y0,x1,y1,...] for the 2D minimap.
    centroids_xy_b64 = traitlets.Unicode("").tag(sync=True)
    # JSON-encoded list of cell ids aligned with centroids_xy_b64 pairs.
    centroids_cell_ids_json = traitlets.Unicode("[]").tag(sync=True)
    # On-demand tile streaming: enforce a distance cap so only nearby tiles load.
    on_demand = traitlets.Bool(False).tag(sync=True)
    # Cap zoom-out (OrbitControls max distance). 0 means "derive in JS from bbox".
    max_orbit_distance = traitlets.Float(0.0).tag(sync=True)

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
