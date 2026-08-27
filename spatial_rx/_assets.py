"""Resolve bundled anywidget frontend assets."""

from __future__ import annotations

import os
from pathlib import Path

_BUNDLED_DIR = Path(__file__).parent / "static" / "bundled"
_DEV_SERVER = os.environ.get("SPATIAL_RX_WIDGET_DEV_SERVER", "http://localhost:5173")
_DEV_WIDGET = os.environ.get("SPATIAL_RX_WIDGET_DEV")


def widget_esm(name: str) -> Path | str:
    """Return bundled ESM path, or a Vite dev-server URL when dev mode is enabled."""
    if _DEV_WIDGET == name:
        return f"{_DEV_SERVER}/src/widgets/{name}/index.tsx?anywidget"
    path = _BUNDLED_DIR / f"{name}.mjs"
    if not path.exists():
        msg = (
            f"Missing bundled widget {name!r} at {path}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    return path


def widget_css(name: str) -> Path | str:
    """Return shared bundled CSS. Empty in dev mode (Vite injects styles)."""
    if _DEV_WIDGET == name:
        return ""
    path = _BUNDLED_DIR / "widgets.css"
    if not path.exists():
        msg = (
            f"Missing bundled widget CSS at {path}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    return path
