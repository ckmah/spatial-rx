from __future__ import annotations

import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import scaffold_widget as sw  # noqa: E402


def test_parse_traitlet_cli_list_dict():
    spec = sw.parse_traitlet_cli("points:List[Dict]=[]")
    assert spec.name == "points"
    assert spec.type == "List"
    assert spec.element == "Dict"
    assert spec.default == []


def test_parse_traitlet_cli_unicode_string():
    spec = sw.parse_traitlet_cli('color:Unicode="#ff2d95"')
    assert spec.type == "Unicode"
    assert spec.default == "#ff2d95"


def test_parse_traitlet_cli_tuple():
    spec = sw.parse_traitlet_cli("pos:Tuple[Int,Int,Int]=[0,0,0]")
    assert spec.type == "Tuple"
    assert spec.elements == ["Int", "Int", "Int"]
    assert spec.default == [0, 0, 0]


def test_build_spec_from_cli():
    spec = sw.build_spec_from_cli(
        "scatter-overlay",
        class_name=None,
        traitlets=["radius:Float=4.0", "color:Unicode=#abc"],
        docstring="Point overlay",
    )
    assert spec.name == "scatter-overlay"
    assert spec.class_name == "ScatterOverlayWidget"
    assert spec.view_name == "ScatterOverlayView"
    assert spec.module_name == "scatter_overlay"
    assert len(spec.traitlets) == 2


def test_generate_widget_py_contains_traitlets():
    spec = sw.build_spec_from_cli(
        "filter-form",
        class_name="FilterFormWidget",
        traitlets=[
            "values:Dict={}",
            "submitted:Bool=false",
        ],
        docstring="Filter form",
    )
    py = sw.generate_widget_py(spec)
    assert "class FilterFormWidget(AnyWidget):" in py
    assert 'widget_esm("filter-form")' in py
    assert "values = traitlets.Dict()" in py
    assert "submitted = traitlets.Bool()" in py
    assert "default_value=False" in py


def test_generate_view_tsx_subscribes_all_traitlets():
    spec = sw.build_spec_from_cli(
        "filter-form",
        class_name="FilterFormWidget",
        traitlets=["values:Dict={}", "submitted:Bool=false"],
        docstring="Filter form",
    )
    tsx = sw.generate_view_tsx(spec)
    assert "type FilterFormModel" in tsx
    assert '"values",' in tsx
    assert '"submitted",' in tsx
    assert "values, submitted" in tsx


def test_add_vite_entry_idempotent():
    content = 'const widgetEntries = {\n  gallery: path.resolve(rootDir, "src/widgets/gallery/index.tsx"),\n};\n'
    updated, changed = sw.add_vite_entry(content, "gallery")
    assert not changed
    assert updated == content

    updated, changed = sw.add_vite_entry(content, "new-widget")
    assert changed
    assert 'widgets/new-widget/index.tsx' in updated


def test_patch_init_py_adds_import_and_export():
    content = (
        'from .gallery import GalleryWidget\n'
        'from .landmarks import LandmarksWidget\n\n'
        '__all__ = ["GalleryWidget", "LandmarksWidget", "__version__"]\n'
    )
    updated, changed = sw.patch_init_py(content, "filter_form", "FilterFormWidget")
    assert changed
    assert "from .filter_form import FilterFormWidget" in updated
    assert "FilterFormWidget" in updated
    assert updated.index("FilterFormWidget") < updated.index("__version__")


def test_scaffold_writes_files(tmp_path: Path):
    repo = tmp_path / "repo"
    (repo / "frontend" / "src" / "widgets").mkdir(parents=True)
    (repo / "spatial_rx").mkdir()
    (repo / "demos").mkdir()
    (repo / "frontend" / "vite.config.ts").write_text(
        'const widgetEntries = {\n};\n',
        encoding="utf-8",
    )
    (repo / "spatial_rx" / "__init__.py").write_text(
        'from .landmarks import LandmarksWidget\n\n'
        '__all__ = ["LandmarksWidget", "__version__"]\n',
        encoding="utf-8",
    )

    spec = sw.build_spec_from_cli(
        "test-widget",
        class_name="TestWidget",
        traitlets=["count:Int=0"],
        docstring="Test",
    )
    created = sw.scaffold(spec, repo_root=repo, demo=True, force=False)

    assert (repo / "frontend/src/widgets/test-widget/index.tsx").exists()
    assert (repo / "frontend/src/widgets/test-widget/TestView.tsx").exists()
    assert (repo / "spatial_rx/test_widget.py").exists()
    assert (repo / "demos/test-widget.py").exists()
    assert any("vite.config.ts" in path for path in created)


def test_scaffold_refuses_overwrite(tmp_path: Path):
    repo = tmp_path / "repo"
    widget_dir = repo / "frontend" / "src" / "widgets" / "dupe"
    widget_dir.mkdir(parents=True)
    (widget_dir / "index.tsx").write_text("existing", encoding="utf-8")
    (repo / "spatial_rx").mkdir()
    (repo / "frontend" / "vite.config.ts").write_text(
        "const widgetEntries = {};\n",
        encoding="utf-8",
    )
    (repo / "spatial_rx" / "__init__.py").write_text(
        '__all__ = ["__version__"]\n',
        encoding="utf-8",
    )

    spec = sw.build_spec_from_cli(
        "dupe",
        class_name="DupeWidget",
        traitlets=["flag:Bool=false"],
        docstring="Dupe",
    )
    with pytest.raises(FileExistsError):
        sw.scaffold(spec, repo_root=repo, demo=False, force=False)


def test_load_yaml_spec():
    yaml_path = ROOT / "widgets" / "gallery.yaml"
    spec = sw.load_yaml_spec(yaml_path)
    assert spec.name == "gallery"
    assert spec.class_name == "GalleryWidget"
    assert [t.name for t in spec.traitlets] == [
        "items",
        "selected_index",
        "columns",
    ]
