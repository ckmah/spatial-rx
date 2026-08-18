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
    assert "spline" in w.modes and "shape" in w.modes
    assert not hasattr(w, "active_selection_id")
    assert not hasattr(w, "distances")


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
