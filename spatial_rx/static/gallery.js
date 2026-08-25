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

function tooltipHost(doc) {
  let host = doc.getElementById("gallery-tooltip-host");
  if (!host) {
    host = doc.createElement("div");
    host.id = "gallery-tooltip-host";
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.pointerEvents = "none";
    host.style.zIndex = "2147483646";
    doc.body.appendChild(host);
  }
  return host;
}

function getTooltip(doc) {
  const host = tooltipHost(doc);
  let tip = host.querySelector(".gallery__tooltip");
  if (!tip) {
    tip = doc.createElement("div");
    tip.className = "gallery__tooltip";
    tip.style.display = "none";
    host.appendChild(tip);
  }
  return tip;
}

function render({ model, el }) {
  const doc = el.ownerDocument || document;
  const root = doc.createElement("div");
  root.className = "gallery";
  el.appendChild(root);
  syncThemeClass(root);
  const themeObserver = new MutationObserver(() => syncThemeClass(root));
  themeObserver.observe(doc.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme", "data-mode"],
  });
  if (doc.body) {
    themeObserver.observe(doc.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode"],
    });
  }
  doc.defaultView?.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener?.("change", () => {
    syncThemeClass(root);
  });

  const tip = getTooltip(doc);

  function placeTip(text, clientX, clientY) {
    if (!text) {
      tip.style.display = "none";
      return;
    }
    tip.textContent = text;
    tip.style.display = "block";
    tip.classList.toggle("gallery__tooltip--dark", root.classList.contains("gallery--dark"));
    tip.classList.toggle("gallery__tooltip--light", root.classList.contains("gallery--light"));

    const pad = 8;
    const offset = 12;
    tip.style.left = `${clientX + offset}px`;
    tip.style.top = `${clientY + offset}px`;
    const tipRect = tip.getBoundingClientRect();
    let left = clientX + offset;
    let top = clientY + offset;
    const vw = doc.defaultView?.innerWidth ?? window.innerWidth;
    const vh = doc.defaultView?.innerHeight ?? window.innerHeight;
    if (left + tipRect.width > vw - pad) {
      left = Math.max(pad, clientX - tipRect.width - offset);
    }
    if (top + tipRect.height > vh - pad) {
      top = Math.max(pad, clientY - tipRect.height - offset);
    }
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  }

  function hideTip() {
    tip.style.display = "none";
  }

  function renderCards() {
    const items = model.get("items") || [];
    const selected = model.get("selected_index");
    const columns = Math.max(1, Number(model.get("columns") || 4));
    root.style.setProperty("--gallery-cols", String(columns));

    const grid = doc.createElement("div");
    grid.className = "gallery__grid";

    items.forEach((item, index) => {
      const card = doc.createElement("button");
      card.type = "button";
      card.className =
        "gallery__card" + (index === selected ? " gallery__card--selected" : "");
      card.setAttribute("aria-pressed", index === selected ? "true" : "false");

      const media = doc.createElement("div");
      media.className = "gallery__media";
      if (item.image) {
        const img = doc.createElement("img");
        img.src = item.image;
        img.alt = item.title || "";
        img.draggable = false;
        media.appendChild(img);
      } else {
        media.classList.add("gallery__media--empty");
      }
      card.appendChild(media);

      const body = doc.createElement("div");
      body.className = "gallery__body";
      const title = doc.createElement("div");
      title.className = "gallery__title";
      title.textContent = item.title || "";
      body.appendChild(title);
      card.appendChild(body);

      const tipText = (item.description || "").trim();
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
    root.appendChild(grid);
  }

  renderCards();
  model.on("change:items", renderCards);
  model.on("change:selected_index", renderCards);
  model.on("change:columns", renderCards);
}

export default { render };
