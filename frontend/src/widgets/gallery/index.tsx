import "@/styles/globals.css";

import { createRoot, type Root } from "react-dom/client";

import { GalleryView } from "./Gallery";

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
  const existing = roots.get(el);
  if (existing) {
    existing.unmount();
    roots.delete(el);
  }
  const root = createRoot(el);
  roots.set(el, root);
  root.render(<GalleryView model={model} hostEl={el} />);
  return () => {
    root.unmount();
    if (roots.get(el) === root) roots.delete(el);
  };
}

export default { render };
