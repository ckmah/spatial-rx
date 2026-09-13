import "@/styles/globals.css";
import "./polyrender.css";

import { createRoot, type Root } from "react-dom/client";

import { PolyrenderView } from "./PolyrenderView";

type RenderContext = {
  model: {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    save_changes(): void;
    on(event: string, callback: () => void): void;
    off?(event: string, callback: () => void): void;
  };
  el: HTMLElement;
};

const roots = new WeakMap<HTMLElement, Root>();

function render({ model, el }: RenderContext) {
  el.style.width = "100%";
  el.style.maxWidth = "100%";
  el.style.minWidth = "0";
  el.style.display = "block";
  const existing = roots.get(el);
  if (existing) {
    existing.unmount();
    roots.delete(el);
  }
  const root = createRoot(el);
  roots.set(el, root);
  root.render(<PolyrenderView model={model} hostEl={el} />);
  return () => {
    root.unmount();
    if (roots.get(el) === root) roots.delete(el);
  };
}

export default { render };
