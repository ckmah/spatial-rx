"""Resolve anywidget frontend assets (bundled React or vanilla static)."""

from __future__ import annotations

import os
from pathlib import Path

_STATIC_DIR = Path(__file__).parent / "static"
_BUNDLED_DIR = _STATIC_DIR / "bundled"
_DEV_SERVER = os.environ.get("SPATIAL_RX_WIDGET_DEV_SERVER", "http://localhost:5173")
_DEV_WIDGET = os.environ.get("SPATIAL_RX_WIDGET_DEV")

# Vanilla widgets have a thin Vite entry under frontend/src/widgets/<name>/index.js
# that re-exports spatial_rx/static/<name>.{js,css} for HMR only.
_VANILLA_WIDGETS = frozenset({"landmarks"})


def _dev_esm_url(name: str) -> str:
    if name in _VANILLA_WIDGETS:
        return f"{_DEV_SERVER}/src/widgets/{name}/index.js?anywidget"
    return f"{_DEV_SERVER}/src/widgets/{name}/index.tsx?anywidget"


def widget_esm(name: str) -> Path | str:
    """Return bundled React ESM path, or a Vite dev-server URL when enabled."""
    if _DEV_WIDGET == name:
        return _dev_esm_url(name)
    path = _BUNDLED_DIR / f"{name}.mjs"
    if not path.exists():
        msg = (
            f"Missing bundled widget {name!r} at {path}. "
            f"Run: cd frontend && npm install && npm run build"
        )
        raise FileNotFoundError(msg)
    return path


def widget_css(name: str) -> Path | str:
    """Return shared bundled CSS. Empty in Vite dev mode (styles are injected)."""
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


def vanilla_esm(name: str) -> Path | str:
    """Return vanilla widget ESM Path (ANYWIDGET_HMR-friendly), or Vite URL."""
    if _DEV_WIDGET == name:
        return _dev_esm_url(name)
    path = _STATIC_DIR / f"{name}.js"
    if not path.exists():
        raise FileNotFoundError(f"Missing vanilla widget ESM at {path}")
    return path


def vanilla_css(name: str) -> Path | str:
    """Return vanilla widget CSS Path, or empty string in Vite dev mode."""
    if _DEV_WIDGET == name:
        return ""
    path = _STATIC_DIR / f"{name}.css"
    if not path.exists():
        raise FileNotFoundError(f"Missing vanilla widget CSS at {path}")
    return path
