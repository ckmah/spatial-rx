export function geneDisplayBounds(
  gene: { vmin?: number; vmax?: number } | undefined,
  log1p: boolean,
) {
  const vmin = gene?.vmin ?? 0;
  const vmax = gene?.vmax ?? 1;
  const lo = Math.max(0, vmin);
  const hi = Math.max(lo + 1e-6, Math.max(0, vmax));
  if (!log1p) return { lo, hi };
  return { lo: Math.log1p(lo), hi: Math.log1p(hi) };
}
