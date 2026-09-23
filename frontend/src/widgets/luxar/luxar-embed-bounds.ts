/** Default notebook embed height (matches `--luxar-embed-height` in globals.css). */
export const LUXAR_EMBED_HEIGHT_PX = 720;
export const LUXAR_EMBED_MIN_HEIGHT_PX = 400;
export const LUXAR_EMBED_MAX_HEIGHT_PX = 1400;

/**
 * Luxar sizes the renderer via SceneManager.measureViewport():
 *   parent.clientHeight || canvas.clientHeight || window.innerHeight
 *
 * When the shell is not laid out yet, the window fallback stamps huge inline
 * canvas px heights and the marimo cell expands. Keep the shell box fixed
 * before init and cap any measured height at the embed limit.
 */
export function readLuxarEmbedHeightPx(
  el: HTMLElement,
  fallback = LUXAR_EMBED_HEIGHT_PX,
): number {
  const raw = getComputedStyle(el).getPropertyValue("--luxar-embed-height").trim();
  const parsed = parseFloat(raw);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

export function applyLuxarHostBounds(
  el: HTMLElement,
  heightPx = LUXAR_EMBED_HEIGHT_PX,
): void {
  const px = `${heightPx}px`;
  el.classList.add("spatial-rx-luxar-host");
  el.style.setProperty("--luxar-embed-height", px);
  el.style.display = "block";
  el.style.width = "100%";
  el.style.height = px;
  el.style.minHeight = px;
  el.style.maxHeight = "none";
  el.style.overflow = "visible";
}

/** Keep the React root in sync with the anywidget host box. */
export function applyLuxarRootBounds(
  root: HTMLElement,
  heightPx = LUXAR_EMBED_HEIGHT_PX,
): void {
  const px = `${heightPx}px`;
  root.style.setProperty("--luxar-embed-height", px);
  root.style.width = "100%";
  root.style.height = px;
  root.style.minHeight = px;
  root.style.maxHeight = "none";
}

export function luxarEmbedViewport(
  shell: HTMLElement,
  canvas: HTMLCanvasElement,
  maxHeightPx: number,
): { width: number; height: number } {
  const width = Math.max(1, shell.clientWidth || canvas.clientWidth || 1);
  const measured = shell.clientHeight || canvas.clientHeight || maxHeightPx;
  const height = Math.min(Math.max(1, measured), maxHeightPx);
  return { width, height };
}

/** Force layout so Luxar's parent-first measureViewport sees a bounded box. */
export function forceLuxarShellLayout(shell: HTMLElement): void {
  void shell.offsetHeight;
}
