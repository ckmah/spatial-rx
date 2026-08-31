from pathlib import Path

import spatial_rx._assets as assets


def test_widget_esm_returns_bundled_path():
    path = assets.widget_esm("landmarks")
    assert isinstance(path, Path)
    assert path.name == "landmarks.mjs"
    assert path.exists()


def test_widget_css_returns_shared_bundled_path():
    path = assets.widget_css()
    assert isinstance(path, Path)
    assert path.name == "widgets.css"
    assert path.exists()


def test_assets_are_paths_not_strings():
    """anywidget HMR only watches Path/_esm file refs — never read_text() strings."""
    assert isinstance(assets.widget_esm("landmarks"), Path)
    assert isinstance(assets.widget_css(), Path)
