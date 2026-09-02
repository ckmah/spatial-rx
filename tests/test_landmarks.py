import numpy as np
import pytest

from tests.helpers import adata_xy, graph


def test_constructor_defaults():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0, 3.0])
    y = np.array([0.0, 1.0, 0.0, 1.0])
    color = np.array(["a", "b", "a", "c"])
    w = LandmarksWidget(adata_xy(x, y, color=color), color="label")
    assert w.mode == "select"
    assert w.width == 1100 and w.height == 700
    assert len(w.point_palette) == 3
    assert w.points_data
    assert int(w._knn_index.indptr[-1]) == 0
    assert int(w._radius_index.indptr[-1]) == 0
    assert w.x_bounds[0] < 0.0 and w.x_bounds[1] > 3.0
    assert w.point_opacity == 0.8
    assert w.landmark_opacity == 0.28
    assert w.stroke_width == 2
    assert w.default_buffer_side == "both"
    assert w.default_buffer_width > 0
    diag = float(np.hypot(3.0, 1.0))
    assert w.point_size == pytest.approx(0.01 * diag)
    assert w.default_buffer_width == pytest.approx(0.05 * diag)
    assert "spline" in w.modes and "shape" in w.modes
    assert "lasso" in w.modes
    assert "polygon" not in w.modes
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0}
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


def test_get_indices_by_selection_id():
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
    assert set(w.get_indices(x, y).tolist()) == {0, 1, 2}
    assert set(w.get_indices(x, y, selection_id="all").tolist()) == {0, 1, 2}
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0}
    assert set(w.get_indices(x, y, selection_id="missing").tolist()) == set()


def test_get_mask_rectangle():
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
    mask = w.get_mask(x, y, selection_id="selection 1")
    assert mask[0] and not mask[1]


def _box_around(x0, y0, half=0.25):
    return {
        "id": "selection 1",
        "type": "polygon",
        "vertices": [
            [x0 - half, y0 - half],
            [x0 + half, y0 - half],
            [x0 + half, y0 + half],
            [x0 - half, y0 + half],
        ],
    }


def test_neighborhood_radius_expands_selection():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 8.0])
    y = np.array([0.0, 0.0, 0.0])
    radius = graph(3, [(0, 1, 1.0), (1, 0, 1.0)])
    knn = graph(3, [(0, 1, 1.0), (1, 0, 1.0), (1, 2, 1.0), (2, 1, 1.0)])
    w = LandmarksWidget(adata_xy(x, y, knn=knn, radius=radius))
    w.selections = [
        {
            **_box_around(0.0, 0.0),
            "neighborhood": "radius",
            "neighborhood_radius": 1.5,
        }
    ]
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0, 1}
    assert set(
        w.get_indices(x, y, selection_id="selection 1", expand=False).tolist()
    ) == {0}
    assert set(w.get_indices(x, y).tolist()) == {0, 1, 2}


def test_neighborhood_knn_expands_selection():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 8.0])
    y = np.array([0.0, 0.0, 0.0])
    knn = graph(3, [(0, 1, 1.0), (1, 0, 1.0)])
    radius = graph(3, [])
    w = LandmarksWidget(adata_xy(x, y, knn=knn, radius=radius))
    w.selections = [
        {
            **_box_around(0.0, 0.0),
            "neighborhood": "knn",
        }
    ]
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0, 1}


def test_neighborhood_off_does_not_expand():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0])
    y = np.array([0.0, 0.0])
    w = LandmarksWidget(adata_xy(x, y))
    w.selections = [
        {
            **_box_around(0.0, 0.0),
            "neighborhood": "off",
            "neighborhood_radius": 5.0,
            "neighborhood_k": 1,
        }
    ]
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0}


def test_get_type_mask_neighborhood():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 10.0, 0.4])
    y = np.array([0.0, 0.0, 0.0])
    color = np.array(["Stem", "Stem", "Immune"])
    radius = graph(3, [(0, 2, 1.0), (2, 0, 1.0)])
    knn = graph(3, [])
    w = LandmarksWidget(adata_xy(x, y, color=color, knn=knn, radius=radius), color="label")
    assert set(w.get_type_indices("Stem", expand=False).tolist()) == {0, 1}
    w.type_neighborhoods = [
        {
            "id": "Stem",
            "neighborhood": "radius",
            "neighborhood_radius": 1.0,
        }
    ]
    assert set(w.get_type_indices("Stem").tolist()) == {0, 1, 2}
    assert set(w.get_type_indices("Stem", expand=False).tolist()) == {0, 1}
    seed = np.asarray(w._data_labels).astype(str) == "Stem"
    via_index = seed | w._radius_index.expand(seed, "radius", radius=1.0)
    assert np.array_equal(via_index, w.get_type_mask("Stem"))
