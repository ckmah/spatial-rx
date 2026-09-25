import base64
from urllib.request import urlopen

import numpy as np
import pytest

pytest.importorskip("spatialdata")

from spatial_rx import LandmarksWidget
from tests.helpers import toy_spatialdata

NEW_TRAITS = {"volume", "volume_label_ids", "volume_cut"}


@pytest.fixture
def sdata(tmp_path):
    return toy_spatialdata(tmp_path / "toy.zarr")


def test_widget_from_sdata_serves_the_volume(sdata):
    w = LandmarksWidget(sdata, color="cell_type")
    assert set(w.volume) == {"image_url", "labels_url", "voxel_size_um", "origin_um", "contrast_limits"}
    assert w.volume["voxel_size_um"] == [1.0, 1.0, 1.0]
    assert w.volume["image_url"].endswith("/images/mosaic/")
    assert w.volume["labels_url"].endswith("/labels/cells/")
    with urlopen(w.volume["image_url"] + "zarr.json") as r:  # served, NGFF metadata
        assert r.status == 200
    ids = np.frombuffer(base64.b64decode(w.volume_label_ids), dtype=np.int32)
    np.testing.assert_array_equal(ids, sdata.tables["table"].obs["cell_id"].to_numpy())
    assert w.volume_cut == [0.0, 256.0, 0.0, 256.0, 0.0, 64.0]


def test_adata_widget_has_empty_volume(sdata):
    w = LandmarksWidget(sdata.tables["table"])
    assert w.volume == {} and w.volume_label_ids == ""


def test_only_three_new_synced_traits():
    synced = {n for n, t in LandmarksWidget.class_traits().items() if t.metadata.get("sync")}
    assert NEW_TRAITS <= synced
    assert not {n for n in synced if n.startswith(("volume", "cube_"))} - NEW_TRAITS
