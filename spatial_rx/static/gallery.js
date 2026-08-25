function isDarkTheme(node) {
  let el = node;
  while (el) {
    if (el.classList) {
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
    }
    const theme = el.getAttribute?.("data-theme") || el.getAttribute?.("data-mode");
    if (theme === "dark") return true;
    if (theme === "light") return false;
    el = el.parentElement;
  }
  const root = document.documentElement;
  const body = document.body;
  for (const n of [root, body]) {
    if (!n) continue;
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

function syncThemeClass(root) {
  const dark = isDarkTheme(root.parentElement || root);
  root.classList.toggle("gallery--dark", dark);
  root.classList.toggle("gallery--light", !dark);
}

function render({ model, el }) {
  const root = document.createElement("div");
  root.className = "gallery";
  el.appendChild(root);
  syncThemeClass(root);
  const themeObserver = new MutationObserver(() => syncThemeClass(root));
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme", "data-mode"],
  });
  if (document.body) {
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });
  }
  window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", () => {
    syncThemeClass(root);
  });

  const tip = document.createElement("div");
  tip.className = "gallery__tooltip";
  tip.hidden = true;
  root.appendChild(tip);

  function placeTip(text, clientX, clientY) {
    if (!text) {
      tip.hidden = true;
      return;
    }
    tip.textContent = text;
    tip.hidden = false;
    const rect = root.getBoundingClientRect();
    let left = clientX - rect.left + 12;
    let top = clientY - rect.top + 12;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
    const tipRect = tip.getBoundingClientRect();
    if (tipRect.right > rect.right - 8) {
      tip.style.left = `${Math.max(8, rect.width - tipRect.width - 8)}px`;
    }
    if (tipRect.bottom > rect.bottom - 8) {
      tip.style.top = `${Math.max(8, clientY - rect.top - tipRect.height - 12)}px`;
    }
  }

  function hideTip() {
    tip.hidden = true;
  }

  function renderCards() {
    const items = model.get("items") || [];
    const selected = model.get("selected_index");
    const columns = Math.max(1, Number(model.get("columns") || 4));
    root.style.setProperty("--gallery-cols", String(columns));

    const grid = document.createElement("div");
    grid.className = "gallery__grid";

    items.forEach((item, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className =
        "gallery__card" + (index === selected ? " gallery__card--selected" : "");
      card.setAttribute("aria-pressed", index === selected ? "true" : "false");

      const media = document.createElement("div");
      media.className = "gallery__media";
      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.title || "";
        img.draggable = false;
        media.appendChild(img);
      } else {
        media.classList.add("gallery__media--empty");
      }
      card.appendChild(media);

      const body = document.createElement("div");
      body.className = "gallery__body";
      const title = document.createElement("div");
      title.className = "gallery__title";
      title.textContent = item.title || "";
      body.appendChild(title);
      if (item.description) {
        const desc = document.createElement("div");
        desc.className = "gallery__desc";
        desc.textContent = item.description;
        body.appendChild(desc);
      }
      card.appendChild(body);

      const tipText = [item.title, item.description].filter(Boolean).join("\n\n");
      card.addEventListener("click", () => {
        model.set("selected_index", index);
        model.save_changes();
      });
      card.addEventListener("mouseenter", (e) => placeTip(tipText, e.clientX, e.clientY));
      card.addEventListener("mousemove", (e) => placeTip(tipText, e.clientX, e.clientY));
      card.addEventListener("mouseleave", hideTip);

      grid.appendChild(card);
    });

    root.querySelectorAll(".gallery__grid").forEach((node) => node.remove());
    root.insertBefore(grid, tip);
  }

  renderCards();
  model.on("change:items", renderCards);
  model.on("change:selected_index", renderCards);
  model.on("change:columns", renderCards);
}

export default { render };
