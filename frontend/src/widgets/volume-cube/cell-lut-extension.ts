import { ColorPalette3DExtensions } from "@hms-dbmi/viv";

/**
 * Viv volume rendering for an image plus one label channel, coloured per cell.
 *
 * Channel 0 is the image; channel 1 holds each voxel's label id, negated on the
 * cell's surface (a voxel with a differently labelled 6-neighbour). A small
 * RGBA lookup texture (`cellLut`) maps id -> colour and fill alpha; texel 0 is
 * the colour and alpha of surfaces that are not highlighted.
 *
 * Showing, hiding or recolouring cells rewrites only the lookup texture (a few
 * MB at most), never the volume textures, so the Labels switch and a new
 * highlight are one redraw instead of a refetch and re-upload of the window.
 *
 * The label channel is read with texelFetch: Viv filters its 3D textures
 * linearly, which would blend neighbouring ids into ids of unrelated cells.
 */

/**
 * Width of the lookup texture; ids wrap onto rows. It is a 3D texture, and
 * desktop GPUs cap each 3D axis at 2048, so 2048 x 2048 ids (4M) fit.
 */
export const CELL_LUT_WIDTH = 2048;

/** Largest id a float32 channel holds exactly. */
export const MAX_EXACT_LABEL = 2 ** 24;

export type CellLut = { data: Uint8Array; width: number; height: number };

/** Nothing drawn for any cell: used while Labels is off. */
export const EMPTY_CELL_LUT: CellLut = { data: new Uint8Array(4), width: 1, height: 1 };

// The module must not share the sampler's name: luma.gl keys a module's
// uniforms by module name and would set the sampler's texture unit from them.
const cellLutModule = {
  name: "cellColors",
  fs: `\
// A one-deep 3D texture: luma.gl validates the program before it assigns
// texture units, and a sampler2D beside Viv's sampler3Ds (all on unit 0 then)
// fails that validation.
uniform highp sampler3D cellLut;

// Colour (linear RGB) and per-sample alpha of the voxel with label value v.
vec4 cellColor(float v) {
  if (v == 0.0) return vec4(0.0);
  ivec2 size = textureSize(cellLut, 0).xy;
  int id = int(abs(v) + 0.5);
  vec4 own = vec4(0.0);
  if (id < size.x * size.y) own = texelFetch(cellLut, ivec3(id % size.x, id / size.x, 0), 0);
  if (v > 0.0) return own;
  // Surface voxel: a highlighted cell's own colour, otherwise the shared outline.
  if (own.a > 0.0) return vec4(own.rgb, 0.9);
  return texelFetch(cellLut, ivec3(0), 0);
}
`,
};

// Declared before the ray march; no channel placeholders, so Viv does not
// repeat these lines per channel.
const CELL_SETUP = `
  ivec3 cellSize = textureSize(volume1, 0);`;

const CELL_SAMPLE = `
    vec4 cell = canShow * cellColor(
      texelFetch(volume1, clamp(ivec3(p * vec3(cellSize)), ivec3(0), cellSize - 1), 0).r
    );`;

const ADDITIVE = {
  _BEFORE_RENDER: CELL_SETUP,
  _RENDER: `
    // Cell first, so a coloured cell reads in its own colour over bright stain.
    ${CELL_SAMPLE}
    color.rgb += (1.0 - color.a) * cell.a * cell.rgb;
    color.a += (1.0 - color.a) * cell.a;
    // Image, composited as Viv's additive blend does.
    float imageAlpha = clamp(intensityValue0, 0.0, 1.0);
    color.rgb += (1.0 - color.a) * imageAlpha * imageAlpha * fragmentUniforms3D.color0;
    color.a += (1.0 - color.a) * imageAlpha;
    if (color.a >= 0.95) {
      break;
    }`,
  _AFTER_RENDER: "",
};

const MIP = {
  _BEFORE_RENDER: `${CELL_SETUP}
  float maxImage = -1.0;
  vec4 cells = vec4(0.0);`,
  _RENDER: `
    maxImage = max(maxImage, intensityValue0);
    if (cells.a < 0.95) {
      ${CELL_SAMPLE}
      cells.rgb += (1.0 - cells.a) * cell.a * cell.rgb;
      cells.a += (1.0 - cells.a) * cell.a;
    }`,
  _AFTER_RENDER: `
  // Cells in front, composited over the image's maximum-intensity projection.
  vec3 projection = clamp(maxImage, 0.0, 1.0) * fragmentUniforms3D.color0;
  color = vec4(cells.rgb + (1.0 - cells.a) * projection, 1.0);`,
};

type LayerLike = {
  constructor: { layerName?: string };
  props: { cellLut?: CellLut | null };
  state: { model?: { setBindings(b: Record<string, unknown>): void } | null; cellLutTexture?: Texture | null };
  context: { device: { createTexture(props: Record<string, unknown>): Texture } };
  setState(patch: Record<string, unknown>): void;
};
type Texture = { destroy(): void };

/** Only Viv's XR3DLayer draws; its VolumeLayer parent shares the extension. */
function isRaycaster(layer: LayerLike): boolean {
  return layer.constructor.layerName === "XR3DLayer";
}

abstract class CellLutExtension extends ColorPalette3DExtensions.BaseExtension {
  static componentName = "CellLutExtension";
  abstract rendering: typeof ADDITIVE;

  getVivShaderTemplates() {
    return { modules: [cellLutModule] };
  }

  // deck.gl calls these with `this` bound to the layer.
  updateState(update: { props: object; oldProps: object }) {
    const layer = this as unknown as LayerLike;
    const params = update as { props: LayerLike["props"]; oldProps: LayerLike["props"] };
    if (!isRaycaster(layer)) return;
    if (layer.state.cellLutTexture && params.props.cellLut === params.oldProps.cellLut) return;
    const lut = params.props.cellLut ?? EMPTY_CELL_LUT;
    layer.state.cellLutTexture?.destroy();
    const texture = layer.context.device.createTexture({
      dimension: "3d",
      width: lut.width,
      height: lut.height,
      depth: 1,
      format: "rgba8unorm",
      data: lut.data,
      mipmaps: false,
      sampler: {
        minFilter: "nearest",
        magFilter: "nearest",
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge",
        addressModeW: "clamp-to-edge",
      },
    });
    layer.setState({ cellLutTexture: texture });
  }

  draw() {
    const layer = this as unknown as LayerLike;
    if (!isRaycaster(layer)) return;
    const texture = layer.state.cellLutTexture;
    if (texture && layer.state.model) layer.state.model.setBindings({ cellLut: texture });
  }

  finalizeState() {
    const layer = this as unknown as LayerLike;
    if (!isRaycaster(layer)) return;
    layer.state.cellLutTexture?.destroy();
  }
}

// Separate classes: deck.gl treats two instances of one extension class with
// equal options as the same extension and would not recompile on a mode switch.
class CellLutAdditiveExtension extends CellLutExtension {
  static extensionName = "CellLutAdditiveExtension";
  rendering = ADDITIVE;
}

class CellLutMipExtension extends CellLutExtension {
  static extensionName = "CellLutMipExtension";
  rendering = MIP;
}

export const CELL_EXTENSIONS = {
  additive: [new CellLutAdditiveExtension()],
  mip: [new CellLutMipExtension()],
};

function srgbToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function hexToLinear(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = Number.parseInt(m[1]!, 16);
  // Viv converts the blended colour to sRGB at the end; stored linear, an
  // opaque cell comes out in exactly the Landmarks colour.
  return [
    Math.round(srgbToLinear((n >> 16) & 255) * 255),
    Math.round(srgbToLinear((n >> 8) & 255) * 255),
    Math.round(srgbToLinear(n & 255) * 255),
  ];
}

export type HighlightGroup = { name: string; color: string; labels: number[] };

/** Per-sample alpha of a highlighted cell's interior: a nucleus ends up mostly opaque. */
const FILL_ALPHA = 0.45;
/** Outlines of other cells: clear with nothing highlighted, faint behind highlights. */
const OUTLINE = { color: "#f97316", alpha: 0.5, behindHighlight: 0.08 };

/** Lookup texture for the given highlight groups (texel 0: shared outline). */
export function buildCellLut(groups: readonly HighlightGroup[]): CellLut {
  let maxId = 0;
  // Ids past the texture (or past float32's exact range) stay uncoloured.
  const limit = Math.min(MAX_EXACT_LABEL, CELL_LUT_WIDTH * CELL_LUT_WIDTH);
  for (const g of groups) for (const id of g.labels) if (id > maxId && id < limit) maxId = id;
  const n = maxId + 1;
  const width = Math.min(CELL_LUT_WIDTH, n);
  const height = Math.ceil(n / width);
  const data = new Uint8Array(width * height * 4);
  const outline = hexToLinear(OUTLINE.color)!;
  data.set([...outline, Math.round(255 * (groups.length ? OUTLINE.behindHighlight : OUTLINE.alpha))], 0);
  const fill = Math.round(255 * FILL_ALPHA);
  for (const g of groups) {
    const rgb = hexToLinear(g.color);
    if (!rgb) continue;
    for (const id of g.labels) {
      if (id <= 0 || id > maxId) continue;
      data.set([rgb[0], rgb[1], rgb[2], fill], id * 4);
    }
  }
  return { data, width, height };
}
