from pathlib import Path

import spatial_rx._assets as assets


def test_vanilla_esm_defaults_to_static_path(monkeypatch):
    monkeypatch.delenv("SPATIAL_RX_WIDGET_DEV", raising=False)
    monkeypatch.setattr(assets, "_DEV_WIDGET", None)
    path = assets.vanilla_esm("landmarks")
    assert isinstance(path, Path)
    assert path.name == "landmarks.js"
    assert path.exists()
    css = assets.vanilla_css("landmarks")
    assert isinstance(css, Path)
    assert css.name == "landmarks.css"
    assert css.exists()


def test_vanilla_dev_mode_returns_vite_url(monkeypatch):
    monkeypatch.setattr(assets, "_DEV_WIDGET", "landmarks")
    monkeypatch.setattr(assets, "_DEV_SERVER", "http://localhost:5173")
    assert assets.vanilla_esm("landmarks") == (
        "http://localhost:5173/src/widgets/landmarks/index.js?anywidget"
    )
    assert assets.vanilla_css("landmarks") == ""


def test_react_dev_mode_returns_tsx_url(monkeypatch):
    monkeypatch.setattr(assets, "_DEV_WIDGET", "gallery")
    monkeypatch.setattr(assets, "_DEV_SERVER", "http://localhost:5173")
    assert assets.widget_esm("gallery") == (
        "http://localhost:5173/src/widgets/gallery/index.tsx?anywidget"
    )
    assert assets.widget_css("gallery") == ""
