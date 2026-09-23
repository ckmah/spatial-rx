"""LuxarWidget: view-only embed for compiled ``.luxar.zarr`` scenes.

Compilation (SpatialData → Luxar Zarr) lives in ``spatial_rx.luxar_scene``.
This module only serves a pre-built archive over loopback HTTP and embeds
``LuxarApp`` via the synced ``src`` traitlet.
"""

from __future__ import annotations

from http.server import ThreadingHTTPServer
from pathlib import Path
from typing import Any

import traitlets
from anywidget import AnyWidget

from spatial_rx._assets import luxar_runtime_urls, luxar_widget_css, widget_esm
from spatial_rx.http_serve import serve_directory


class LuxarWidget(AnyWidget):
    """Embed a compiled Luxar scene from a ``src`` URL (loopback or remote).

    Chrome follows the notebook cell width; height starts at 720px and is
    resizable. The browser uses spatial-rx layer chrome (visibility, opacity,
    reset view) over the Luxar renderer. Luxar's built-in panels stay hidden.
    """

    _esm = widget_esm("luxar")
    _css = luxar_widget_css()

    src = traitlets.Unicode("").tag(sync=True)
    worker_path = traitlets.Unicode("").tag(sync=True)
    wasm_path = traitlets.Unicode("").tag(sync=True)

    def __init__(
        self,
        src: str = "",
        worker_path: str = "",
        wasm_path: str = "",
        **kwargs: Any,
    ) -> None:
        self._server: ThreadingHTTPServer | None = None
        super().__init__(
            src=src,
            worker_path=worker_path,
            wasm_path=wasm_path,
            **kwargs,
        )

    def shutdown(self) -> None:
        """Stop the loopback server when this widget started one via ``view_luxar_zarr``."""
        if self._server is not None:
            self._server.shutdown()
            self._server = None


def view_luxar_zarr(path: Path | str) -> LuxarWidget:
    """Serve an existing ``.luxar.zarr`` directory and return a viewer widget.

    Does not compile or fit — ``path`` must already be a Luxar Zarr store.
    Also serves bundled Luxar worker assets over loopback (required in notebooks).
    """
    root = Path(path)
    if not root.is_dir():
        raise FileNotFoundError(root)
    worker_path, wasm_path = luxar_runtime_urls()
    server, base = serve_directory(root)
    # Luxar treats trailing-slash URLs as directory listings (dataset browser).
    # Serve the store root but pass a bare origin URL so HEAD probes hit zarr.json.
    widget = LuxarWidget(
        src=base.rstrip("/"),
        worker_path=worker_path,
        wasm_path=wasm_path,
    )
    widget._server = server
    return widget
