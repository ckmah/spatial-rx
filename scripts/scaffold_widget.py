#!/usr/bin/env python3
"""Scaffold a React/shadcn anywidget from a traitlet specification."""

from __future__ import annotations

import argparse
import ast
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

REPO_ROOT = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = Path(__file__).resolve().parent / "templates"

KEBAB_RE = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")
TRAITLET_CLI_RE = re.compile(
    r"^(?P<name>[a-z_][a-z0-9_]*):(?P<type>[A-Za-z]+(?:\[[^\]]+\])?)=(?P<default>.*)$"
)
VALID_TYPES = {"Int", "Float", "Bool", "Unicode", "List", "Dict", "Tuple"}


@dataclass
class TraitletSpec:
    name: str
    type: str
    element: str | None = None
    elements: list[str] = field(default_factory=list)
    default: Any = None
    sync: bool = True

    @property
    def type_expr(self) -> str:
        if self.type == "List" and self.element:
            return f"List[{self.element}]"
        if self.type == "Tuple" and self.elements:
            return f"Tuple[{','.join(self.elements)}]"
        return self.type


@dataclass
class WidgetSpec:
    name: str
    class_name: str
    traitlets: list[TraitletSpec]
    docstring: str = "Generated widget"

    @property
    def module_name(self) -> str:
        return self.name.replace("-", "_")

    @property
    def view_name(self) -> str:
        base = self.class_name
        if base.endswith("Widget"):
            base = base[: -len("Widget")]
        return f"{base}View"

    @property
    def model_type_name(self) -> str:
        base = self.class_name
        if base.endswith("Widget"):
            base = base[: -len("Widget")]
        return f"{base}Model"


def kebab_to_class_name(kebab: str) -> str:
    return "".join(part.capitalize() for part in kebab.split("-")) + "Widget"


def parse_type_expr(type_expr: str) -> tuple[str, str | None, list[str]]:
    if type_expr.startswith("List[") and type_expr.endswith("]"):
        inner = type_expr[5:-1]
        if inner not in VALID_TYPES:
            raise ValueError(f"Unsupported list element type: {inner}")
        return "List", inner, []
    if type_expr.startswith("Tuple[") and type_expr.endswith("]"):
        inner = type_expr[6:-1]
        parts = [p.strip() for p in inner.split(",") if p.strip()]
        if not parts:
            raise ValueError("Tuple type requires at least one element type")
        for part in parts:
            if part not in VALID_TYPES:
                raise ValueError(f"Unsupported tuple element type: {part}")
        return "Tuple", None, parts
    if type_expr not in VALID_TYPES:
        raise ValueError(f"Unsupported traitlet type: {type_expr}")
    return type_expr, None, []


def parse_default(raw: str) -> Any:
    raw = raw.strip()
    if not raw:
        return ""
    lowered = raw.lower()
    if lowered == "true":
        return True
    if lowered == "false":
        return False
    if lowered == "null":
        return None
    try:
        return ast.literal_eval(raw)
    except (SyntaxError, ValueError):
        return raw


def parse_traitlet_cli(raw: str) -> TraitletSpec:
    match = TRAITLET_CLI_RE.match(raw.strip())
    if not match:
        msg = (
            "Invalid --traitlet format. Expected name:Type=default, "
            'e.g. points:List[Dict]=[] or color:Unicode="#ff2d95"'
        )
        raise ValueError(msg)
    name = match.group("name")
    type_expr = match.group("type")
    default = parse_default(match.group("default"))
    type_name, element, elements = parse_type_expr(type_expr)
    return TraitletSpec(
        name=name,
        type=type_name,
        element=element,
        elements=elements,
        default=default,
    )


def parse_traitlet_yaml(raw: dict[str, Any]) -> TraitletSpec:
    name = str(raw["name"])
    type_name = str(raw["type"])
    if type_name not in VALID_TYPES:
        raise ValueError(f"Unsupported traitlet type: {type_name}")
    element = raw.get("element")
    elements = list(raw.get("elements") or [])
    if type_name == "List" and element is not None:
        element = str(element)
    if type_name == "Tuple":
        elements = [str(x) for x in elements]
    default = raw.get("default")
    sync = bool(raw.get("sync", True))
    return TraitletSpec(
        name=name,
        type=type_name,
        element=str(element) if element is not None else None,
        elements=elements,
        default=default,
        sync=sync,
    )


def load_yaml_spec(path: Path) -> WidgetSpec:
    try:
        import yaml
    except ImportError as exc:
        msg = "PyYAML is required for --spec. Install with: uv sync --group dev"
        raise SystemExit(msg) from exc

    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Widget spec must be a YAML mapping")
    name = str(data["name"])
    class_name = str(data.get("class") or kebab_to_class_name(name))
    docstring = str(data.get("docstring") or f"{class_name} widget")
    raw_traitlets = data.get("traitlets") or []
    if not raw_traitlets:
        raise ValueError("Widget spec requires at least one traitlet")
    traitlets = [parse_traitlet_yaml(t) for t in raw_traitlets]
    return WidgetSpec(name=name, class_name=class_name, traitlets=traitlets, docstring=docstring)


def build_spec_from_cli(
    name: str,
    *,
    class_name: str | None,
    traitlets: list[str],
    docstring: str,
) -> WidgetSpec:
    if not KEBAB_RE.match(name):
        raise ValueError(f"Widget name must be kebab-case: {name!r}")
    if not traitlets:
        raise ValueError("Provide at least one --traitlet")
    parsed = [parse_traitlet_cli(t) for t in traitlets]
    return WidgetSpec(
        name=name,
        class_name=class_name or kebab_to_class_name(name),
        traitlets=parsed,
        docstring=docstring,
    )


def _python_traitlet_type(spec: TraitletSpec) -> str:
    if spec.type == "List":
        if spec.element:
            return f"traitlets.List(traitlets.{spec.element}())"
        return "traitlets.List()"
    if spec.type == "Tuple":
        inner = ", ".join(f"traitlets.{t}()" for t in spec.elements)
        return f"traitlets.Tuple({inner})"
    return f"traitlets.{spec.type}()"


def _python_default_literal(value: Any) -> str:
    if isinstance(value, str):
        return repr(value)
    if value is None:
        return "None"
    return repr(value)


def render_traitlet_declarations(traitlets: list[TraitletSpec]) -> str:
    lines: list[str] = []
    for spec in traitlets:
        trait_type = _python_traitlet_type(spec)
        default = _python_default_literal(spec.default)
        sync = ".tag(sync=True)" if spec.sync else ""
        lines.append(
            f"    {spec.name} = {trait_type}, default_value={default}{sync}"
        )
    return "\n".join(lines)


def _python_param_type(spec: TraitletSpec) -> str:
    mapping = {
        "Int": "int",
        "Float": "float",
        "Bool": "bool",
        "Unicode": "str",
    }
    if spec.type in mapping:
        return mapping[spec.type]
    if spec.type == "Dict":
        return "dict[str, Any]"
    if spec.type == "List":
        if spec.element == "Dict":
            return "list[dict[str, Any]]"
        if spec.element == "Unicode":
            return "list[str]"
        if spec.element == "Int":
            return "list[int]"
        if spec.element == "Float":
            return "list[float]"
        return "list[Any]"
    if spec.type == "Tuple":
        parts = [_python_param_type(TraitletSpec(name="", type=t, default=None)) for t in spec.elements]
        return f"tuple[{', '.join(parts)}]"
    return "Any"


def render_init_signature(traitlets: list[TraitletSpec]) -> str:
    lines: list[str] = []
    for spec in traitlets:
        py_type = _python_param_type(spec)
        default = _python_default_literal(spec.default)
        if spec.type in {"List", "Dict", "Tuple"}:
            lines.append(
                f"        {spec.name}: {py_type} | None = None,"
            )
        else:
            lines.append(f"        {spec.name}: {py_type} = {default},")
    lines.append("        *,")
    return "\n".join(lines)


def render_init_super_kwargs(traitlets: list[TraitletSpec]) -> str:
    lines: list[str] = []
    for spec in traitlets:
        if spec.type in {"List", "Dict", "Tuple"}:
            default = _python_default_literal(spec.default)
            lines.append(
                f"            {spec.name}={spec.name} if {spec.name} is not None else {default},"
            )
        else:
            lines.append(f"            {spec.name}={spec.name},")
    return "\n".join(lines)


def _ts_field_type(spec: TraitletSpec) -> str:
    mapping = {
        "Int": "number",
        "Float": "number",
        "Bool": "boolean",
        "Unicode": "string",
        "Dict": "Record<string, unknown>",
    }
    if spec.type in mapping:
        return mapping[spec.type]
    if spec.type == "List":
        if spec.element == "Dict":
            return "Record<string, unknown>[]"
        if spec.element == "Unicode":
            return "string[]"
        if spec.element == "Int":
            return "number[]"
        if spec.element == "Float":
            return "number[]"
        return "unknown[]"
    if spec.type == "Tuple":
        parts = [_ts_field_type(TraitletSpec(name="", type=t, default=None)) for t in spec.elements]
        return f"[{', '.join(parts)}]"
    return "unknown"


def render_ts_fields(traitlets: list[TraitletSpec]) -> str:
    return "\n".join(
        f"  {spec.name}: {_ts_field_type(spec)};" for spec in traitlets
    )


def render_traitlet_keys_ts(traitlets: list[TraitletSpec]) -> str:
    return "\n".join(f'    "{spec.name}",' for spec in traitlets)


def render_demo_ctor_kwargs(traitlets: list[TraitletSpec]) -> str:
    lines: list[str] = []
    for spec in traitlets:
        default = _python_default_literal(spec.default)
        lines.append(f"        {spec.name}={default},")
    return "\n".join(lines)


def render_from_template(name: str, mapping: dict[str, str]) -> str:
    content = (TEMPLATES_DIR / name).read_text(encoding="utf-8")
    for key, value in mapping.items():
        content = re.sub(
            rf"\{{\{{\s*{re.escape(key)}\s*\}}\}}",
            lambda _m, v=value: v,
            content,
        )
    return content


def generate_widget_py(spec: WidgetSpec) -> str:
    return render_from_template(
        "widget.py.tpl",
        {
            "class_name": spec.class_name,
            "docstring": spec.docstring,
            "kebab_name": spec.name,
            "traitlet_declarations": render_traitlet_declarations(spec.traitlets),
            "init_signature": render_init_signature(spec.traitlets),
            "init_super_kwargs": render_init_super_kwargs(spec.traitlets),
        },
    )


def generate_index_tsx(spec: WidgetSpec) -> str:
    return render_from_template(
        "index.tsx.tpl",
        {"view_name": spec.view_name},
    )


def generate_view_tsx(spec: WidgetSpec) -> str:
    names = ", ".join(spec.name for spec in spec.traitlets)
    return render_from_template(
        "View.tsx.tpl",
        {
            "view_name": spec.view_name,
            "model_type_name": spec.model_type_name,
            "ts_fields": render_ts_fields(spec.traitlets),
            "destructure_names": names,
            "traitlet_keys_ts": render_traitlet_keys_ts(spec.traitlets),
        },
    )


def generate_demo_py(spec: WidgetSpec) -> str:
    traitlet_names_py = ", ".join(repr(t.name) for t in spec.traitlets)
    return render_from_template(
        "demo.py.tpl",
        {
            "class_name": spec.class_name,
            "demo_ctor_kwargs": render_demo_ctor_kwargs(spec.traitlets),
            "traitlet_names_py": traitlet_names_py,
        },
    )


def add_vite_entry(content: str, name: str) -> tuple[str, bool]:
    if re.search(rf"^\s*{re.escape(name)}\s*:", content, re.MULTILINE):
        return content, False
    entry = f'  {name}: path.resolve(rootDir, "src/widgets/{name}/index.tsx"),\n'
    updated, count = re.subn(
        r"(const widgetEntries = \{\n)",
        r"\1" + entry,
        content,
        count=1,
    )
    if count == 0:
        raise ValueError("Could not find widgetEntries in vite.config.ts")
    return updated, True


def patch_init_py(content: str, module_name: str, class_name: str) -> tuple[str, bool]:
    import_line = f"from .{module_name} import {class_name}"
    changed = False
    if import_line not in content:
        lines = content.splitlines(keepends=True)
        insert_at = len(lines)
        for i, line in enumerate(lines):
            if line.startswith("from .") and import_line < line:
                insert_at = i
                break
            if line.startswith("__all__"):
                insert_at = i
                break
        lines.insert(insert_at, import_line + "\n")
        content = "".join(lines)
        changed = True

    all_match = re.search(r"__all__ = (\[[^\]]*\])", content)
    if all_match and class_name not in all_match.group(1):
        all_list = ast.literal_eval(all_match.group(1))
        if "__version__" in all_list:
            all_list.insert(all_list.index("__version__"), class_name)
        else:
            all_list.append(class_name)
        content = (
            content[: all_match.start(1)]
            + repr(all_list)
            + content[all_match.end(1) :]
        )
        changed = True
    return content, changed


def write_file(path: Path, content: str, *, force: bool) -> None:
    if path.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite existing file: {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def scaffold(
    spec: WidgetSpec,
    *,
    repo_root: Path,
    demo: bool,
    force: bool,
) -> list[str]:
    created: list[str] = []

    widget_dir = repo_root / "frontend" / "src" / "widgets" / spec.name
    files = {
        widget_dir / "index.tsx": generate_index_tsx(spec),
        widget_dir / f"{spec.view_name}.tsx": generate_view_tsx(spec),
        repo_root / "spatial_rx" / f"{spec.module_name}.py": generate_widget_py(spec),
    }
    if demo:
        files[repo_root / "demos" / f"{spec.name}.py"] = generate_demo_py(spec)

    for path, content in files.items():
        write_file(path, content, force=force)
        created.append(str(path.relative_to(repo_root)))

    vite_path = repo_root / "frontend" / "vite.config.ts"
    vite_content = vite_path.read_text(encoding="utf-8")
    vite_content, vite_changed = add_vite_entry(vite_content, spec.name)
    if vite_changed:
        vite_path.write_text(vite_content, encoding="utf-8")
        created.append(str(vite_path.relative_to(repo_root)))

    init_path = repo_root / "spatial_rx" / "__init__.py"
    init_content = init_path.read_text(encoding="utf-8")
    init_content, init_changed = patch_init_py(
        init_content, spec.module_name, spec.class_name
    )
    if init_changed:
        init_path.write_text(init_content, encoding="utf-8")
        created.append(str(init_path.relative_to(repo_root)))

    return created


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "name",
        nargs="?",
        help="Widget name in kebab-case (omit when using --spec)",
    )
    parser.add_argument(
        "--spec",
        type=Path,
        help="Path to widget YAML spec (e.g. widgets/scatter-overlay.yaml)",
    )
    parser.add_argument(
        "--class",
        dest="class_name",
        help="Python class name (default: derived from kebab name + Widget)",
    )
    parser.add_argument(
        "--traitlet",
        action="append",
        default=[],
        metavar="SPEC",
        help='Traitlet spec: name:Type=default, e.g. radius:Float=4.0',
    )
    parser.add_argument(
        "--docstring",
        default="Generated widget",
        help="One-line widget description for generated Python module",
    )
    parser.add_argument(
        "--demo",
        action="store_true",
        help="Also generate demos/<name>.py",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing generated files",
    )
    args = parser.parse_args(argv)

    try:
        if args.spec:
            spec = load_yaml_spec(args.spec.resolve())
        else:
            if not args.name:
                parser.error("Provide a widget name or --spec")
            spec = build_spec_from_cli(
                args.name,
                class_name=args.class_name,
                traitlets=args.traitlet,
                docstring=args.docstring,
            )
        created = scaffold(
            spec,
            repo_root=REPO_ROOT,
            demo=args.demo,
            force=args.force,
        )
    except (ValueError, FileExistsError, OSError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    print("Created:")
    for path in created:
        print(f"  {path}")
    print("\nNext:")
    print("  1. Implement the {/* UI */} stub in the generated View.tsx")
    print("  2. Add validation in the Python __init__ if needed")
    print("  3. cd frontend && npm run build")
    print("  4. Commit spatial_rx/static/bundled/*")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
