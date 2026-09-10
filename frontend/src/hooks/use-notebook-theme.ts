import { useLayoutEffect, useState } from "react";

function isDarkTheme(node: HTMLElement | null): boolean {
  let el: HTMLElement | null = node;
  while (el) {
    if (
      el.classList.contains("dark") ||
      el.classList.contains("dark-theme") ||
      el.classList.contains("theme-dark")
    ) {
      return true;
    }
    if (
      el.classList.contains("light") ||
      el.classList.contains("light-theme") ||
      el.classList.contains("theme-light")
    ) {
      return false;
    }
    const theme = el.getAttribute("data-theme") ?? el.getAttribute("data-mode");
    if (theme === "dark") return true;
    if (theme === "light") return false;
    el = el.parentElement;
  }

  for (const n of [document.documentElement, document.body]) {
    if (
      n.classList.contains("dark") ||
      n.classList.contains("dark-theme") ||
      n.getAttribute("data-theme") === "dark" ||
      n.getAttribute("data-mode") === "dark"
    ) {
      return true;
    }
    if (
      n.classList.contains("light") ||
      n.classList.contains("light-theme") ||
      n.getAttribute("data-theme") === "light" ||
      n.getAttribute("data-mode") === "light"
    ) {
      return false;
    }
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

/** Match marimo / Jupyter light-dark class on ancestor nodes. */
export function useNotebookTheme(el: HTMLElement | null) {
  const [dark, setDark] = useState(() => isDarkTheme(el));

  useLayoutEffect(() => {
    if (!el) return;
    const sync = () => setDark(isDarkTheme(el));
    sync();

    const observer = new MutationObserver(sync);
    const observed = new Set<Node>();
    const watch = (node: Node | null | undefined) => {
      if (!node || observed.has(node)) return;
      observed.add(node);
      observer.observe(node, {
        attributes: true,
        attributeFilter: ["class", "data-theme", "data-mode", "style"],
      });
    };

    let node: HTMLElement | null = el;
    while (node) {
      watch(node);
      node = node.parentElement;
    }
    watch(document.documentElement);
    watch(document.body);

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    media?.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media?.removeEventListener("change", sync);
    };
  }, [el]);

  return dark;
}
