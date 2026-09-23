"""Resolve anywidget frontend assets (bundled React).

Authoring reload uses anywidget's file watcher, not the Vite dev server:

1. ``npm run watch`` (or ``npm run watch:landmarks``) rewrites the bundle on save
2. ``ANYWIDGET_HMR=1`` on the Python/marimo process watches that Path and swaps ESM

``_esm`` / ``_css`` must stay as ``pathlib.Path`` (never ``.read_text()``) so
anywidget can watch them. See https://anywidget.dev/en/getting-started/
"""

from __future__ import annotations

import threading
from http.server import ThreadingHTTPServer
from pathlib import Path

from spatial_rx.http_serve import serve_directory

_BUNDLED_DIR = Path(__file__).parent / "static" / "bundled"
_assets_server: ThreadingHTTPServer | None = None
_assets_base_url: str | None = None
_assets_lock = threading.Lock()


def widget_esm(name: str) -> Path:
    """Return bundled React ESM path (anywidget-HMR-friendly)."""
    path = _BUNDLED_DIR / f"{name}.mjs"
    if not path.exists():
        msg = (
            f"Missing bundled widget {name!r} at {path}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    return path


def widget_css() -> Path:
    """Return shared bundled CSS path (Tailwind + all React widget styles)."""
    path = _BUNDLED_DIR / "widgets.css"
    if not path.exists():
        msg = (
            f"Missing bundled widget CSS at {path}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    return path


def luxar_css() -> Path:
    """Return Luxar viewer stylesheet (not extracted by the lib build)."""
    path = _BUNDLED_DIR / "luxar.css"
    if not path.exists():
        msg = (
            f"Missing Luxar CSS at {path}. "
            f"Run: cd frontend && npm run build:luxar"
        )
        raise FileNotFoundError(msg)
    return path


def luxar_widget_css() -> Path:
    """Return combined CSS for ``LuxarWidget`` (anywidget accepts one ``_css`` path).

    Merges shared widget chrome (``widgets.css``) with Luxar viewer styles
    (``luxar.css``). Without this, a tuple ``_css`` is stringified and neither
    sheet loads in the notebook — the control rail renders unstyled/invisible.
    """
    combined = _BUNDLED_DIR / "luxar-widget.css"
    widgets = widget_css()
    luxar = luxar_css()
    newest_source = max(widgets.stat().st_mtime, luxar.stat().st_mtime)
    if not combined.is_file() or combined.stat().st_mtime < newest_source:
        combined.write_text(
            widgets.read_text(encoding="utf-8") + "\n" + luxar.read_text(encoding="utf-8"),
            encoding="utf-8",
        )
    return combined


def luxar_assets_base_url() -> str:
    """Loopback URL for Luxar worker/WASM assets (shared across widgets)."""
    global _assets_server, _assets_base_url
    with _assets_lock:
        if _assets_base_url is None:
            _assets_server, _assets_base_url = serve_directory(_BUNDLED_DIR)
        return _assets_base_url


def luxar_runtime_urls() -> tuple[str, str]:
    """Return ``(worker_path, wasm_path)`` URLs for ``LuxarApp.init``."""
    assets_dir = _BUNDLED_DIR / "assets"
    if not assets_dir.is_dir():
        msg = (
            f"Missing Luxar bundled assets at {assets_dir}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    data_workers = sorted(assets_dir.glob("data-worker-*.js"))
    if not data_workers:
        raise FileNotFoundError(f"No data-worker bundle under {assets_dir}")
    base = luxar_assets_base_url().rstrip("/")
    worker_path = f"{base}/assets/{data_workers[0].name}"
    wasm_js = assets_dir / "wasm" / "luxar_wasm.js"
    wasm_path = f"{base}/assets/wasm/luxar_wasm.js" if wasm_js.is_file() else ""
    return worker_path, wasm_path


def shutdown_luxar_assets_server() -> None:
    """Stop the shared Luxar assets loopback server (tests)."""
    global _assets_server, _assets_base_url
    with _assets_lock:
        if _assets_server is not None:
            _assets_server.shutdown()
            _assets_server = None
            _assets_base_url = None
