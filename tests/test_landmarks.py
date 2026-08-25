import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np


def _fig():
    fig, ax = plt.subplots()
    ax.scatter([0, 1, 2], [0, 1, 0])
    ax.set_xlim(-1, 3)
    ax.set_ylim(-1, 2)
    return fig


def test_defaults():
    from spatial_rx import LandmarksWidget

    fig = _fig()
    w = LandmarksWidget(fig)
    plt.close(fig)
    assert w.mode == "select"
    assert w.renderer == "matplotlib"
    assert "spline" in w.modes and "shape" in w.modes
    assert "lasso" in w.modes
    assert "polygon" not in w.modes
    assert not hasattr(w, "active_selection_id")
    assert not hasattr(w, "distances")


def test_from_points_scatter():
    from spatial_rx import LandmarksWidget

    x = np.array([0.0, 1.0, 2.0, 3.0])
    y = np.array([0.0, 1.0, 0.0, 1.0])
    color = np.array(["a", "b", "a", "c"])
    w = LandmarksWidget.from_points(x, y, color=color, width=400, height=400)
    assert w.renderer == "scatter"
    assert w.width == 400 and w.height == 400
    assert len(w.point_palette) == 3
    assert w.points_data
    assert w.x_bounds[0] < 0.0 and w.x_bounds[1] > 3.0
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


def test_from_points_requires_xy():
    from spatial_rx import LandmarksWidget
    import pytest

    with pytest.raises(TypeError):
        LandmarksWidget()
    with pytest.raises(ValueError):
        LandmarksWidget.from_points([], [])


def test_gallery_requires_title():
    from spatial_rx import GalleryWidget
    import pytest

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

    fig = _fig()
    w = LandmarksWidget(fig)
    plt.close(fig)
    w.selections = [
        {
            "id": "selection 1",
            "type": "polygon",
            "vertices": [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
        }
    ]
    x = np.array([0.0, 1.0, 2.0])
    y = np.array([0.0, 1.0, 0.0])
    assert set(w.get_indices(x, y).tolist()) == {0, 1, 2}
    assert set(w.get_indices(x, y, selection_id="all").tolist()) == {0, 1, 2}
    assert set(w.get_indices(x, y, selection_id="selection 1").tolist()) == {0}
    assert set(w.get_indices(x, y, selection_id="missing").tolist()) == set()


def test_get_mask_rectangle():
    from spatial_rx import LandmarksWidget

    fig = _fig()
    w = LandmarksWidget(fig)
    plt.close(fig)
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
    x = np.array([0.0, 2.0])
    y = np.array([0.0, 2.0])
    mask = w.get_mask(x, y, selection_id="selection 1")
    assert mask[0] and not mask[1]
