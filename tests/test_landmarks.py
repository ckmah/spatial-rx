import numpy as np
import pytest

from spatial_rx.selection import selection_mask
from tests.helpers import adata_xy


def test_constructor_defaults():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0, 3.0])
    y = np.array([0.0, 1.0, 0.0, 1.0])
    color = np.array(["a", "b", "a", "c"])
    w = LandmarksWidget(adata_xy(x, y, color=color), color="label")
    assert w.mode == "select"
    assert len(w._data_x) == 4
    assert len(w.point_palette) == 3
    assert w.points_data
    assert w.x_bounds[0] < 0.0 and w.x_bounds[1] > 3.0
    assert w.default_buffer_width == 0.0
    assert w.point_size > 0


def test_marker_radius_and_selection_mask():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0, 3.0])
    y = np.zeros(4)
    w = LandmarksWidget(adata_xy(x, y))
    assert w.point_size == pytest.approx(0.4)
    assert len(w._data_x) == 4
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    mask = selection_mask(list(w.selections), x, y, "selection 1")
    assert set(np.flatnonzero(mask).tolist()) == {0}
    w.set_color(np.array([0.1, 0.2, 0.3, 0.9]), legend_title="expr")
    assert w.color_by == "continuous"
    assert len(w.point_palette) >= 64
    assert w.legend_title == "expr"
    assert w.color_vmax >= w.color_vmin
    w.set_color(
        np.array(["b", "a", "c", "a"]),
        color_map={"a": "#111111", "b": "#222222", "c": "#333333"},
        legend_title="types",
    )
    assert w.color_by == "categorical"
    assert w.legend_labels == ["a", "b", "c"]
    assert w.point_palette == ["#111111", "#222222", "#333333"]
    w.set_color(
        np.array([0.0, 0.5, 1.0, 0.25]),
        continuous_range=("#ffffff", "#ff0000"),
        legend_title="seq",
    )
    assert w.point_palette[0].lower() == "#ffffff"
    assert w.point_palette[-1].lower() == "#ff0000"


def test_constructor_requires_adata():
    from spatial_rx import LandmarksWidget

    with pytest.raises(TypeError):
        LandmarksWidget()
    with pytest.raises(TypeError, match="AnnData"):
        LandmarksWidget(object())
    with pytest.raises(ValueError, match="at least one observation"):
        LandmarksWidget(adata_xy([], []))


def test_gallery_requires_title():
    from spatial_rx import GalleryWidget

    with pytest.raises(ValueError):
        GalleryWidget(items=[{"description": "no title"}])
    g = GalleryWidget(
        items=[
            {"title": "A", "description": "alpha", "image": "data:image/svg+xml,x"},
            {"title": "B"},
        ],
        selected_index=0,
        columns=4,
    )
    assert g.selected_index == 0
    assert len(g.items) == 2
    assert "description" not in g.items[1]


def test_selection_mask_by_id():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0])
    y = np.array([0.0, 1.0, 0.0])
    w = LandmarksWidget(adata_xy(x, y))
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    assert set(np.flatnonzero(selection_mask(list(w.selections), x, y, "all"))) == {
        0,
        1,
        2,
    }
    assert set(
        np.flatnonzero(selection_mask(list(w.selections), x, y, "selection 1"))
    ) == {0}
    assert set(
        np.flatnonzero(selection_mask(list(w.selections), x, y, "missing"))
    ) == set()


def test_selection_mask_rectangle():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 2.0])
    y = np.array([0.0, 2.0])
    w = LandmarksWidget(adata_xy(x, y))
    w.selections = [
        {
            "id": "selection 1",
            "type": "rectangle",
            "cx": 0.0,
            "cy": 0.0,
            "width": 1.0,
            "height": 1.0,
            "angle": 0.0,
        }
    ]
    mask = selection_mask(list(w.selections), x, y, "selection 1")
    assert mask[0] and not mask[1]


def test_selection_mask_prefers_point_indices():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0])
    y = np.array([0.0, 0.0, 0.0])
    w = LandmarksWidget(adata_xy(x, y))
    w.selections = [
        {
            "id": "s",
            "type": "points",
            "point_indices": [0, 2],
            "vertices": [[10, 10], [11, 10], [11, 11]],  # would miss all if used
        }
    ]
    mask = selection_mask(list(w.selections), x, y, "s")
    assert set(np.flatnonzero(mask).tolist()) == {0, 2}


def test_category_colors_match_the_legend():
    from spatial_rx import LandmarksWidget

    x = [0.0, 1.0, 2.0]
    y = [0.0, 1.0, 2.0]
    w = LandmarksWidget(adata_xy(x, y, color=["a", "b", "a"]), color="label")
    colors = w.category_colors()
    assert colors == dict(zip(w.legend_labels, w.point_palette))
    assert colors == w.category_colors("label")
    with pytest.raises(KeyError):
        w.category_colors("missing")
