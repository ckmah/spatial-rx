"""LuxarWidget: explore/share viewer for compiled SpatialData scenes."""

from __future__ import annotations

import sys
import tempfile
from http.server import ThreadingHTTPServer
from pathlib import Path
from typing import Any

import traitlets
from anywidget import AnyWidget
from spatialdata import SpatialData

from spatial_rx._assets import widget_css, widget_esm
from spatial_rx.http_serve import serve_directory
from spatial_rx.luxar_scene import LuxarUnavailableError, compile_spatialdata, require_luxar


def luxar_supported() -> bool:
    """Return True when this Python can use Luxar (3.12+ and package installed)."""
    if sys.version_info < (3, 12):
        return False
    try:
        require_luxar()
    except LuxarUnavailableError:
        return False
    return True


class LuxarWidget(AnyWidget):
    """Embed a Luxar scene compiled from SpatialData or served from a URL."""

    _esm = widget_esm("luxar")
    _css = widget_css()

    src = traitlets.Unicode("").tag(sync=True)
    status = traitlets.Unicode("").tag(sync=True)

    def __init__(self, src: str = "", status: str = "", **kwargs: Any) -> None:
        self._server: ThreadingHTTPServer | None = None
        super().__init__(src=src, status=status, **kwargs)

    @classmethod
    def from_spatialdata(
        cls,
        sdata: SpatialData,
        dest: Path | None = None,
        *,
        include_gsplats: bool = False,
        gsplat_seeds: int | None = None,
        gsplat_iters: int | None = None,
        **kwargs: Any,
    ) -> LuxarWidget:
        """Compile ``sdata`` to ``.luxar.zarr``, serve it locally, and return a widget."""
        require_luxar()
        root = Path(dest) if dest is not None else Path(tempfile.mkdtemp()) / "scene.luxar.zarr"
        compile_kwargs: dict[str, Any] = {"include_gsplats": include_gsplats}
        if gsplat_seeds is not None:
            compile_kwargs["gsplat_seeds"] = gsplat_seeds
        if gsplat_iters is not None:
            compile_kwargs["gsplat_iters"] = gsplat_iters
        if not root.exists():
            compile_spatialdata(sdata, root, **compile_kwargs)
        server, base = serve_directory(root)
        widget = cls(src=f"{base}/", status="compiled", **kwargs)
        widget._server = server
        return widget

    @classmethod
    def from_blobs_3d(cls, **kwargs: Any) -> LuxarWidget:
        """Convenience constructor for the synthetic ``blobs_3d`` fixture."""
        from spatial_rx.blobs_3d import blobs_3d

        return cls.from_spatialdata(blobs_3d(), **kwargs)

    def shutdown(self) -> None:
        """Stop the loopback server when the notebook no longer needs the widget."""
        if self._server is not None:
            self._server.shutdown()
            self._server = None
