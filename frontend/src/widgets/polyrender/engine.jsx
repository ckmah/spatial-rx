import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Bounds,
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useBounds,
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// Shared loader wired up for meshopt-compressed GLBs (gltfpack -cc output).
const _gltfLoader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);

const h = React.createElement;

const INITIAL_VIEW_DIR = new THREE.Vector3(0.52, 0.46, 0.72).normalize();

// Orbit zoom vs framing distance (initial camera sits ~fitDistance from target).
const ZOOM_MIN_FACTOR = 0.045;
const ZOOM_MAX_FACTOR = 0.5;
// Limit grazing angles (Z-up) so the tight frustum and streaming stay stable.
const ORBIT_MIN_POLAR = 0.2;
const ORBIT_MAX_POLAR = 1.4;
const PRESET_DUR_MS = 420;
// Stream tiles by distance to camera (radii derived from camera.far + tile grid size).
const TILE_LOAD_FAR_MUL = 1.06;
const TILE_UNLOAD_MUL = 1.38;
const TILE_PAD_XY = 0.45;
const TILE_STALE_LOAD_SLACK = 1.06;
const TILE_FADE_MS = 280;
// Spatial fade band for streamed tiles near unload radius (fraction of rUnload).
const TILE_EDGE_FADE_BAND_FRAC = 0.14;
const CAMERA_RESET_MS = 360;
// Grazing XY views (|view·Z| low): shrink far as a fraction of depth-to-bbox along
// look direction so the frustum does not include the full lateral extent at once.
const FAR_EDGE_FRAC = 0.5;
const FAR_TOP_FRAC = 1.06;
const FAR_WZ_EDGE = 0.1;
const FAR_WZ_TOP = 0.72;

/** Closest-point distance from p to axis-aligned bbox (tile.bbox). */
function tileDistanceToAABB(px, py, pz, bbox) {
  const x = Math.min(Math.max(px, bbox[0]), bbox[3]);
  const y = Math.min(Math.max(py, bbox[1]), bbox[4]);
  const z = Math.min(Math.max(pz, bbox[2]), bbox[5]);
  const dx = px - x;
  const dy = py - y;
  const dz = pz - z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function tileStreamingRadii(camFar, tileSizeXy) {
  const ts = Number(tileSizeXy) || 0;
  const rLoad = camFar * TILE_LOAD_FAR_MUL + ts * TILE_PAD_XY;
  const rUnload = rLoad * TILE_UNLOAD_MUL;
  return { rLoad, rUnload };
}

function tileEntryForKey(tiles, key) {
  for (let i = 0; i < tiles.length; i++) {
    const t = tiles[i];
    if (`${t.col}_${t.row}` === key) return t;
  }
  return null;
}

/** Furthest bbox corner along camera look direction (positive = in front). */
function maxBboxDepthAlongDir(camPos, dir, minX, minY, minZ, maxX, maxY, maxZ) {
  let maxD = 0;
  for (let ix = 0; ix < 2; ix++) {
    const x = ix ? maxX : minX;
    for (let iy = 0; iy < 2; iy++) {
      const y = iy ? maxY : minY;
      for (let iz = 0; iz < 2; iz++) {
        const z = iz ? maxZ : minZ;
        const d =
          (x - camPos.x) * dir.x + (y - camPos.y) * dir.y + (z - camPos.z) * dir.z;
        if (d > maxD) maxD = d;
      }
    }
  }
  return maxD;
}

function useTrait(model, key) {
  const [val, setVal] = useState(() => model.get(key));
  useEffect(() => {
    const fn = () => setVal(model.get(key));
    model.on(`change:${key}`, fn);
    return () => {
      if (typeof model.off === "function") model.off(`change:${key}`, fn);
    };
  }, [model, key]);
  return val;
}

function decodeB64ToBytes(b64) {
  if (!b64 || typeof b64 !== "string") return null;
  const s = b64.trim();
  if (!s) return null;
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function zBandClipActive(z0, z1, bz0, bz1) {
  const span = Math.max(bz1 - bz0, 1e-9);
  const eps = Math.max(1e-6, span * 1e-4);
  return z0 > bz0 + eps || z1 < bz1 - eps;
}

function buildZClipPlanes(z0, z1) {
  return [
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -z0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), z1),
  ];
}

function applyClipToMaterial(m, planes) {
  if (!m) return;
  if (!planes || planes.length === 0) {
    m.clipping = false;
    m.clippingPlanes = null;
  } else {
    m.clipping = true;
    m.clippingPlanes = planes;
  }
  m.needsUpdate = true;
}

function framingFromBBox(bbox) {
  if (!bbox || bbox.length !== 6) {
    return { center: [0, 0, 0], distance: 5 };
  }
  const [minX, minY, minZ, maxX, maxY, maxZ] = bbox;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const dx = maxX - minX;
  const dy = maxY - minY;
  const dz = maxZ - minZ;
  const diag = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
  return { center: [cx, cy, cz], distance: diag };
}

function fitCameraDistanceFromBBox(bbox, fovDeg, aspect, margin = 1.32) {
  const [minX, minY, minZ, maxX, maxY, maxZ] = bbox;
  const dx = Math.max(maxX - minX, 1e-9);
  const dy = Math.max(maxY - minY, 1e-9);
  const dz = Math.max(maxZ - minZ, 1e-9);
  const a = Math.max(aspect || 1, 0.05);
  const vFov = (fovDeg * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * a);
  // Half the AABB space diagonal = bounding-sphere radius. Using max(dx,dy,dz)/2
  // is too small for angled views (typical flat XY slabs look "extremely zoomed in").
  const radius = 0.5 * Math.sqrt(dx * dx + dy * dy + dz * dz);
  const distV = radius / Math.tan(vFov / 2);
  const distH = radius / Math.tan(hFov / 2);
  return margin * Math.max(distV, distH);
}

function ReferenceGrid({ bbox, clipPlanes }) {
  const gridRef = useRef(null);
  const { center, distance: diag } = framingFromBBox(bbox);
  const minZ = bbox[2];
  const zPad = Math.max(0.0005, diag * 5e-5);
  const zGrid = minZ - zPad;

  // Plain Three.js GridHelper (stable, cheap). Sits *below* the bbox floor in Z
  // so it is occluded by geometry above; see BoundsRefit.applyRenderFar for the
  // extra far margin so this plane is not frustum-clipped.
  const span = Math.max(diag * 28, 48);
  const divisions = Math.min(768, Math.max(24, Math.round(span / Math.max(0.04, diag / 64))));
  const helper = useMemo(() => {
    const h0 = new THREE.GridHelper(
      span,
      divisions,
      new THREE.Color("#cfe1ff"),
      new THREE.Color("#9aa6b8"),
    );
    const mats = Array.isArray(h0.material) ? h0.material : [h0.material];
    for (const m of mats) {
      if (!m) continue;
      m.depthTest = true;
      m.depthWrite = false;
      m.transparent = true;
      m.opacity = 0.82;
      m.polygonOffset = true;
      m.polygonOffsetFactor = 1;
      m.polygonOffsetUnits = 1;
    }
    h0.renderOrder = 0;
    h0.frustumCulled = false;
    return h0;
  }, [span, divisions]);

  useLayoutEffect(() => {
    const obj = gridRef.current;
    if (!obj) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const m of mats) {
      applyClipToMaterial(m, clipPlanes);
    }
  }, [clipPlanes]);

  return h("primitive", {
    ref: gridRef,
    object: helper,
    position: [center[0], center[1], zGrid],
    rotation: [Math.PI / 2, 0, 0], // rotate XZ (y-up) grid into XY for Z-up scenes
  });
}

function ZUpOrbitControls() {
  const orbitRef = useRef(null);
  return h(OrbitControls, {
    ref: orbitRef,
    makeDefault: true,
    enableDamping: true,
    dampingFactor: 0.08,
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
    minDistance: 0.01,
    maxDistance: 1e6,
    screenSpacePanning: false,
  });
}

function BoundsRefit({ frameTick, bboxKey, bbox, viewCommand, maxOrbitDistance }) {
  const api = useBounds();
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const controls = useThree((s) => s.controls);
  const fitDistanceRef = useRef(1);
  const sceneExtentRef = useRef(1);
  const resetAnimRef = useRef(null);
  const lastViewIdRef = useRef(-1);
  const bbox6Ref = useRef({
    minX: 0,
    minY: 0,
    minZ: 0,
    maxX: 1,
    maxY: 1,
    maxZ: 1,
  });

  const applyRenderFar = useCallback(() => {
    const fd = fitDistanceRef.current;
    const extent = sceneExtentRef.current;
    if (!(fd > 0) || !(extent > 0)) return;
    const { minX, minY, minZ, maxX, maxY, maxZ } = bbox6Ref.current;
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const wz = Math.abs(dir.z);
    const t = THREE.MathUtils.smoothstep(wz, FAR_WZ_EDGE, FAR_WZ_TOP);
    const maxD = maxBboxDepthAlongDir(
      camera.position,
      dir,
      minX,
      minY,
      minZ,
      maxX,
      maxY,
      maxZ,
    );
    const dx = maxX - minX;
    const dy = maxY - minY;
    const dz = maxZ - minZ;
    const diag = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    const floorPad = Math.max(diag * 5e-5, 0.0005);
    // ReferenceGrid / shadow sit slightly below bbox.minZ; extend far enough
    // that the tightened frustum still includes that plane in top-down views.
    const depth = Math.max(maxD, extent * 0.02, camera.near * 10) + floorPad * 6;
    const farFull = depth * FAR_TOP_FRAC + camera.near * 2;
    const frac = THREE.MathUtils.lerp(FAR_EDGE_FRAC, 1, t);
    let far = farFull * frac;
    far = Math.max(far, camera.near * 50);
    far = Math.min(far, farFull);
    camera.far = far;
    camera.updateProjectionMatrix();
  }, [camera]);

  useLayoutEffect(() => {
    if (!bbox || bbox.length !== 6) return;
    if (!size.width || !size.height) return;
    const aspect = size.width / size.height;
    const [minX, minY, minZ, maxX, maxY, maxZ] = bbox;
    const sceneBox = new THREE.Box3(
      new THREE.Vector3(minX, minY, minZ),
      new THREE.Vector3(maxX, maxY, maxZ),
    );
    const { center: c } = framingFromBBox(bbox);
    const center = new THREE.Vector3(c[0], c[1], c[2]);
    const fitDistance = fitCameraDistanceFromBBox(bbox, camera.fov, aspect, 1.32);
    const cap = Number(maxOrbitDistance) || 0;
    // If the user provided a zoom-out cap, start *just inside* it so the initial
    // framing is stable and the user can still zoom out slightly.
    const distance = cap > 0 ? Math.min(fitDistance, cap * 0.94) : fitDistance;
    const pos = center.clone().addScaledVector(INITIAL_VIEW_DIR, distance);
    queueMicrotask(() => {
      api.refresh(sceneBox);
      bbox6Ref.current = { minX, minY, minZ, maxX, maxY, maxZ };
      const extent = sceneBox.getSize(new THREE.Vector3()).length();
      sceneExtentRef.current = Math.max(extent, 1e-9);
      fitDistanceRef.current = Math.max(distance, 1e-9);
      camera.near = Math.max(0.01, extent * 1e-4);
      camera.up.set(0, 0, 1);
      const canAnimate =
        frameTick > 0 && controls && controls.target;
      if (controls && controls.target) {
        controls.minDistance = Math.max(extent * 1e-5, fitDistance * ZOOM_MIN_FACTOR);
        let md = fitDistance * ZOOM_MAX_FACTOR;
        if (cap > 0) md = Math.min(md, cap);
        controls.maxDistance = md;
        controls.minPolarAngle = ORBIT_MIN_POLAR;
        controls.maxPolarAngle = ORBIT_MAX_POLAR;
      }
      if (!canAnimate) {
        resetAnimRef.current = null;
        camera.position.copy(pos);
        camera.lookAt(center);
        if (controls && controls.target) {
          controls.target.copy(center);
          controls.update();
        }
        applyRenderFar();
        camera.updateMatrixWorld();
        invalidate();
        return;
      }
      resetAnimRef.current = {
        t0: performance.now(),
        dur: CAMERA_RESET_MS,
        fromPos: camera.position.clone(),
        fromTgt: controls.target.clone(),
        toPos: pos.clone(),
        toTgt: center.clone(),
      };
      controls.update();
      applyRenderFar();
      camera.updateMatrixWorld();
      invalidate();
    });
  }, [api, frameTick, bboxKey, size.width, size.height, bbox, camera, controls, invalidate, applyRenderFar, maxOrbitDistance]);

  useLayoutEffect(() => {
    if (!viewCommand || !bbox || bbox.length !== 6) return;
    if (!size.width || !size.height) return;
    if (!controls || !controls.target) return;
    if (viewCommand.id === lastViewIdRef.current) return;
    const d = fitDistanceRef.current;
    if (!(d > 0)) return;
    const { center: c } = framingFromBBox(bbox);
    const center = new THREE.Vector3(c[0], c[1], c[2]);
    let toPos;
    const pr = viewCommand.preset;
    if (pr === "top") {
      // Keep a stable azimuth so OrbitControls doesn't "spin" when the view is
      // nearly perfectly top-down (XY azimuth becomes ill-defined at x=y=0).
      // Align with the default/reset azimuth (INITIAL_VIEW_DIR projected to XY).
      const vxy = new THREE.Vector3(INITIAL_VIEW_DIR.x, INITIAL_VIEW_DIR.y, 0);
      if (vxy.lengthSq() < 1e-12) vxy.set(1, 0, 0);
      vxy.normalize();
      toPos = center.clone()
        .addScaledVector(vxy, d * 0.02)
        .add(new THREE.Vector3(0, 0, d));
    } else if (pr === "side") {
      // Side-ish view that keeps the same XY azimuth as reset/top (no spin).
      // Only reduce elevation (Z) and increase lateral distance.
      const vxy = new THREE.Vector3(INITIAL_VIEW_DIR.x, INITIAL_VIEW_DIR.y, 0);
      if (vxy.lengthSq() < 1e-12) vxy.set(1, 0, 0);
      vxy.normalize();
      toPos = center.clone()
        .addScaledVector(vxy, d * 1.05)
        .add(new THREE.Vector3(0, 0, d * 0.18));
    } else {
      toPos = center.clone().addScaledVector(INITIAL_VIEW_DIR, d);
    }
    lastViewIdRef.current = viewCommand.id;
    resetAnimRef.current = {
      t0: performance.now(),
      dur: PRESET_DUR_MS,
      fromPos: camera.position.clone(),
      fromTgt: controls.target.clone(),
      toPos,
      toTgt: center.clone(),
    };
    invalidate();
  }, [viewCommand, bbox, bboxKey, size.width, size.height, camera, controls, invalidate]);

  useFrame(() => {
    const anim = resetAnimRef.current;
    if (!anim || !controls || !controls.target) return;
    const t = Math.min(1, (performance.now() - anim.t0) / anim.dur);
    const k = t * t * (3 - 2 * t);
    camera.position.lerpVectors(anim.fromPos, anim.toPos, k);
    controls.target.lerpVectors(anim.fromTgt, anim.toTgt, k);
    controls.update();
    applyRenderFar();
    invalidate();
    if (t >= 1) {
      camera.position.copy(anim.toPos);
      controls.target.copy(anim.toTgt);
      controls.update();
      resetAnimRef.current = null;
      applyRenderFar();
      invalidate();
    }
  });

  useEffect(() => {
    if (!controls) return;
    const onChange = () => {
      applyRenderFar();
      invalidate();
    };
    controls.addEventListener("change", onChange);
    return () => controls.removeEventListener("change", onChange);
  }, [controls, applyRenderFar, invalidate]);

  useEffect(() => {
    lastViewIdRef.current = -1;
  }, [bboxKey]);

  useEffect(() => {
    if (!controls || !controls.domElement) return;
    const el = controls.domElement;
    const cancel = () => {
      resetAnimRef.current = null;
    };
    el.addEventListener("pointerdown", cancel);
    return () => el.removeEventListener("pointerdown", cancel);
  }, [controls]);

  return null;
}

function ShadowFloor({ bbox, clipPlanes }) {
  if (!bbox || bbox.length !== 6) return null;
  const { center, distance: diag } = framingFromBBox(bbox);
  const minZ = bbox[2];
  const zPad = Math.max(0.0005, diag * 5e-5);
  const floorZ = minZ - 2 * zPad;
  const span = Math.max(diag * 4, 4);
  const geom = useMemo(() => new THREE.PlaneGeometry(span, span), [span]);
  const mat = useMemo(() => new THREE.ShadowMaterial({ opacity: 0.5, transparent: true }), []);
  useLayoutEffect(() => {
    applyClipToMaterial(mat, clipPlanes);
  }, [mat, clipPlanes]);
  useEffect(() => () => { geom.dispose(); mat.dispose(); }, [geom, mat]);
  return h("mesh", {
    geometry: geom,
    material: mat,
    position: [center[0], center[1], floorZ],
    receiveShadow: true,
  });
}

function KeyLight({ bbox }) {
  const ref = useRef(null);
  const { center, distance: diag } = useMemo(() => framingFromBBox(bbox || []), [bbox]);

  useLayoutEffect(() => {
    const light = ref.current;
    if (!light || !bbox || bbox.length !== 6) return;
    const [cx, cy, cz] = center;
    light.target.position.set(cx, cy, cz);
    light.target.updateMatrixWorld();

    const pad = Math.max(diag * 2.5, 2);
    const cam = light.shadow.camera;
    cam.left = -pad; cam.right = pad; cam.top = pad; cam.bottom = -pad;
    cam.near = 0.05;
    cam.far = Math.max(diag * 40, 200);
    cam.updateProjectionMatrix();

    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.bias = -0.00025;
    light.shadow.normalBias = 0.035;
  }, [bbox, center, diag]);

  const [cx, cy, cz] = center;
  const d = Math.max(diag, 0.5);
  return h("directionalLight", {
    ref,
    position: [cx + d * 1.4, cy + d * 1.1, cz + d * 1.8],
    intensity: 1.2,
    castShadow: true,
  });
}

function DemandInvalidate({ opacity }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => { invalidate(); }, [opacity, invalidate]);
  return null;
}

// ---------------------------------------------------------------------------
// Tile management
// ---------------------------------------------------------------------------

function _makeMaterial(wireframe, opacity) {
  const a = opacity == null ? 1 : Math.min(1, Math.max(0, opacity));
  // MeshPhysicalMaterial adds a thin clearcoat + sheen for depth in shading.
  // Clearcoat/sheen amplify any per-face normal difference, which otherwise
  // makes earcut sliver tris on flat caps visible under PBR — kept subtle.
  // Meshes are watertight, so FrontSide is safe and halves shading work.
  return new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    wireframe: !!wireframe,
    side: THREE.FrontSide,
    clipping: true,
    metalness: 0.05,
    roughness: 0.55,
    clearcoat: 0.12,
    clearcoatRoughness: 0.7,
    sheen: 0.08,
    sheenRoughness: 0.85,
    envMapIntensity: 0.7,
    flatShading: false,
    transparent: a < 1,
    opacity: a,
    depthWrite: a >= 0.99,
  });
}

function TileManager({ tileServerUrl, tilesJsonPath, wireframe, opacity, maxFetches, clipPlanes, minimapRef, maxOrbitDistance }) {
  const { invalidate } = useThree();
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  const invalidateRef = useRef(invalidate);
  invalidateRef.current = invalidate;
  const tileServerUrlRef = useRef(tileServerUrl);
  tileServerUrlRef.current = tileServerUrl;
  const reconcileRef = useRef(() => {});
  const tileFadeStartRef = useRef(new Map());

  const tilesRef     = useRef(null);          // parsed tiles.json
  const loadedRef    = useRef(new Map());     // key -> THREE.Group
  const pendingRef   = useRef(new Set());     // keys currently fetching
  const propsRef     = useRef({ wireframe, opacity });
  const clipPlanesRef = useRef(clipPlanes);
  clipPlanesRef.current = clipPlanes;
  const fetchGenRef  = useRef(0);             // bump when tile server / index changes
  const [version, setVersion] = useState(0);

  useEffect(() => { propsRef.current = { wireframe, opacity }; }, [wireframe, opacity]);

  useEffect(() => {
    loadedRef.current.forEach((group) => {
      group.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        applyClipToMaterial(obj.material, clipPlanes);
      });
    });
    invalidateRef.current();
  }, [clipPlanes]);

  useEffect(() => {
    loadedRef.current.forEach((group, key) => {
      const fading = tileFadeStartRef.current.has(key);
      group.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        obj.material.wireframe = !!wireframe;
        if (!fading) {
          const a = opacity == null ? 1 : Math.min(1, Math.max(0, opacity));
          obj.material.transparent = a < 1;
          obj.material.opacity = a;
          obj.material.depthWrite = a >= 0.99;
        }
        obj.material.needsUpdate = true;
      });
    });
    invalidateRef.current();
  }, [wireframe, opacity]);

  function _unloadTile(key, bump = true) {
    tileFadeStartRef.current.delete(key);
    const group = loadedRef.current.get(key);
    if (!group) return;
    group.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      }
    });
    loadedRef.current.delete(key);
    if (bump) { setVersion((v) => v + 1); invalidateRef.current(); }
  }

  function _disposeAllLoaded() {
    tileFadeStartRef.current.clear();
    for (const key of [...loadedRef.current.keys()]) {
      _unloadTile(key, false);
    }
    pendingRef.current.clear();
    setVersion((v) => v + 1);
  }

  const cap = maxFetches == null || maxFetches < 1 ? 4 : maxFetches;

  function _loadRadii(idx) {
    // Best practice: streaming budget should NOT depend on camera angle.
    // Use a fixed, position-based radius derived from maxOrbitDistance (or the
    // current OrbitControls maxDistance if not provided).
    const ts = Number(idx.tile_size_xy) || 0;
    const capD = Number(maxOrbitDistance) || 0;
    let budget = capD;
    if (!(budget > 0) && controls && isFinite(controls.maxDistance)) {
      budget = Number(controls.maxDistance) || 0;
    }
    if (!(budget > 0)) {
      // Fallback for weird states: old behavior.
      return tileStreamingRadii(camera.far, ts);
    }
    const rLoad = budget + ts * TILE_PAD_XY;
    const rUnload = rLoad * TILE_UNLOAD_MUL;
    return { rLoad, rUnload };
  }

  function _pumpLoads() {
    const idx = tilesRef.current;
    const base = tileServerUrlRef.current;
    if (!idx || !idx.tiles || !base) return;
    const px = camera.position.x;
    const py = camera.position.y;
    const pz = camera.position.z;
    const { rLoad } = _loadRadii(idx);
    const candidates = [];
    for (let i = 0; i < idx.tiles.length; i++) {
      const tile = idx.tiles[i];
      const key = `${tile.col}_${tile.row}`;
      if (loadedRef.current.has(key) || pendingRef.current.has(key)) continue;
      const d = tileDistanceToAABB(px, py, pz, tile.bbox);
      if (d <= rLoad) candidates.push({ key, d, tile });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (let j = 0; j < candidates.length; j++) {
      if (pendingRef.current.size >= cap) break;
      const { key, tile } = candidates[j];
      _loadTile(key, `${base}/${tile.glb}`, null);
    }
  }

  function _reconcileStreaming() {
    const idx = tilesRef.current;
    if (!idx || !idx.tiles) return;
    const px = camera.position.x;
    const py = camera.position.y;
    const pz = camera.position.z;
    const { rUnload } = _loadRadii(idx);
    for (const key of [...loadedRef.current.keys()]) {
      const tile = tileEntryForKey(idx.tiles, key);
      if (!tile) continue;
      if (tileDistanceToAABB(px, py, pz, tile.bbox) > rUnload) {
        _unloadTile(key, true);
      }
    }
    _pumpLoads();
  }

  reconcileRef.current = _reconcileStreaming;

  // Load tile; on success swap out the old LOD (crossfade: old stays visible
  // until new has fully arrived, eliminating the blank-frame gap).
  function _loadTile(key, url, swapOutKey) {
    const gen = fetchGenRef.current;
    pendingRef.current.add(key);
    _gltfLoader.load(
      url,
      (gltf) => {
        pendingRef.current.delete(key);
        if (gen !== fetchGenRef.current) return;
        const idx0 = tilesRef.current;
        const tile0 = idx0 && idx0.tiles ? tileEntryForKey(idx0.tiles, key) : null;
        if (tile0) {
          const { rLoad } = _loadRadii(idx0);
          const d0 = tileDistanceToAABB(
            camera.position.x,
            camera.position.y,
            camera.position.z,
            tile0.bbox,
          );
          if (d0 > rLoad * TILE_STALE_LOAD_SLACK) {
            gltf.scene.traverse((obj) => {
              if (!obj.isMesh) return;
              obj.geometry.dispose();
              if (obj.material) obj.material.dispose();
            });
            _pumpLoads();
            return;
          }
        }
        const { wireframe: wf, opacity: op } = propsRef.current;
        gltf.scene.traverse((obj) => {
          if (!obj.isMesh) return;
          // GLBs ship explicit NORMALs (cap = ±Z, side = area-weighted) so the
          // renderer does not need to recompute. Meshopt position quantization
          // would otherwise leak into face normals and produce faint radial
          // streaks on flat caps. Fall back only if normals are missing.
          if (!obj.geometry.attributes.normal) {
            obj.geometry.computeVertexNormals();
          }
          obj.material = _makeMaterial(wf, op);
          applyClipToMaterial(obj.material, clipPlanesRef.current);
          obj.material.transparent = true;
          obj.material.opacity = 0;
          obj.material.depthWrite = false;
          obj.castShadow = true;
        });
        tileFadeStartRef.current.set(key, performance.now());
        loadedRef.current.set(key, gltf.scene);
        // Only now discard the old LOD — avoids the blank-frame flicker.
        if (swapOutKey && swapOutKey !== key) _unloadTile(swapOutKey, false);
        setVersion((v) => v + 1);
        invalidateRef.current();
        _pumpLoads();
      },
      undefined,
      (err) => {
        pendingRef.current.delete(key);
        console.error("[TileManager] tile load error", key, err);
        invalidateRef.current();
        _pumpLoads();
      },
    );
  }

  useEffect(() => {
    if (!tileServerUrl) return;
    const ac = new AbortController();
    let alive = true;
    fetchGenRef.current += 1;
    const gen = fetchGenRef.current;
    tilesRef.current = null;
    _disposeAllLoaded();

    const url = `${tileServerUrl}/${tilesJsonPath}`;
    fetch(url, { signal: ac.signal })
      .then((r) => {
        if (!alive || gen !== fetchGenRef.current) return Promise.reject(new Error("stale"));
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then((data) => {
        if (!alive || gen !== fetchGenRef.current) return;
        // Precompute key->tile for hot-path lookups.
        try {
          data._tileByKey = new Map((data.tiles || []).map((t) => [`${t.col}_${t.row}`, t]));
        } catch (e) {
          data._tileByKey = null;
        }
        tilesRef.current = data;
        if (minimapRef) {
          minimapRef.current = minimapRef.current || {};
          minimapRef.current.tilesIndex = data;
        }
        setVersion((v) => v + 1);
        invalidateRef.current();
        _pumpLoads();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            reconcileRef.current();
            invalidateRef.current();
          });
        });
      })
      .catch((err) => {
        if (!alive) return;
        if (err && (err.name === "AbortError" || err.message === "stale")) return;
        console.error("[TileManager] tiles.json fetch error:", err);
      });

    return () => {
      alive = false;
      ac.abort();
      fetchGenRef.current += 1;
      tilesRef.current = null;
      _disposeAllLoaded();
    };
  }, [tileServerUrl, tilesJsonPath]);

  // Expose loaded/pending sets for minimap rendering (no re-renders).
  useEffect(() => {
    if (!minimapRef) return;
    minimapRef.current = minimapRef.current || {};
    minimapRef.current.loadedKeys = loadedRef.current;
    minimapRef.current.pendingKeys = pendingRef.current;
    minimapRef.current.tilesIndex = tilesRef.current;
  }, [minimapRef]);

  useEffect(() => {
    if (!controls) return;
    const onCam = () => {
      reconcileRef.current();
      invalidateRef.current();
    };
    controls.addEventListener("change", onCam);
    onCam();
    return () => controls.removeEventListener("change", onCam);
  }, [controls]);

  useFrame(() => {
    const idx = tilesRef.current;
    const byKey = idx && idx._tileByKey ? idx._tileByKey : null;
    const fades = tileFadeStartRef.current;
    const op = propsRef.current.opacity;
    const aFull = op == null ? 1 : Math.min(1, Math.max(0, op));
    if (!idx || !idx.tiles || !byKey) {
      if (fades.size > 0) invalidateRef.current();
      return;
    }

    const px = camera.position.x;
    const py = camera.position.y;
    const pz = camera.position.z;
    const { rUnload } = _loadRadii(idx);
    const fadeBand = Math.max(1e-6, rUnload * TILE_EDGE_FADE_BAND_FRAC);
    const fadeStart = Math.max(0, rUnload - fadeBand);
    const now = performance.now();

    let needInv = false;
    for (const [key, group] of loadedRef.current.entries()) {
      const tile = byKey.get(key);
      if (!tile || !group) continue;
      const d = tileDistanceToAABB(px, py, pz, tile.bbox);
      let spatial = 1;
      if (d >= fadeStart) {
        const u = Math.min(1, Math.max(0, (d - fadeStart) / Math.max(1e-9, (rUnload - fadeStart))));
        spatial = 1 - (u * u * (3 - 2 * u));
      }

      let temporal = 1;
      if (fades.has(key)) {
        const t0 = fades.get(key);
        const u = Math.min(1, (now - t0) / TILE_FADE_MS);
        temporal = u * u * (3 - 2 * u);
        if (u >= 1) fades.delete(key);
      }

      const a = aFull * spatial * temporal;
      group.traverse((obj) => {
        if (!obj.isMesh || !obj.material) return;
        obj.material.opacity = a;
        obj.material.transparent = a < 0.99 || aFull < 0.99;
        obj.material.depthWrite = a >= 0.99 && aFull >= 0.99;
        obj.material.needsUpdate = true;
      });
      needInv = needInv || spatial < 0.999 || temporal < 0.999;
    }
    if (needInv) invalidateRef.current();
  });

  // Render loaded tile scenes as primitives
  return h(
    React.Fragment,
    null,
    ...[...loadedRef.current.entries()].map(([key, scene]) =>
      h("primitive", { key, object: scene }),
    ),
  );
}

function CameraStream({ posRef, tgtRef }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  useFrame(() => {
    if (!posRef || !tgtRef) return;
    posRef.current.copy(camera.position);
    if (controls && controls.target) {
      tgtRef.current.copy(controls.target);
    }
  });
  return null;
}

function ViewportQuadStream({ quadRef, zRefMode, zMin, zMax }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  const size = useThree((s) => s.size);
  const tmp = useMemo(() => ({
    p: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    o: new THREE.Vector3(),
    v: new THREE.Vector3(),
  }), []);
  useFrame(() => {
    if (!quadRef || !size.width || !size.height) return;
    const zRef =
      zRefMode === "band" ? 0.5 * (Number(zMin) + Number(zMax))
        : (controls && controls.target ? controls.target.z : 0.5 * (Number(zMin) + Number(zMax)));
    const corners = [
      [-1, -1],
      [ 1, -1],
      [ 1,  1],
      [-1,  1],
    ];
    const out = [];
    const o = tmp.o;
    const v = tmp.v;
    for (let i = 0; i < corners.length; i++) {
      const [nx, ny] = corners[i];
      v.set(nx, ny, 0.5).unproject(camera);
      o.copy(camera.position);
      const dz = v.z - o.z;
      if (Math.abs(dz) < 1e-12) {
        out.push([NaN, NaN]);
        continue;
      }
      const t = (zRef - o.z) / dz;
      out.push([o.x + (v.x - o.x) * t, o.y + (v.y - o.y) * t]);
    }
    quadRef.current = { zRef, pts: out };
  });
  return null;
}

function _pointInConvexQuad(px, py, pts) {
  if (!pts || pts.length !== 4) return false;
  // Reject NaNs early.
  for (let i = 0; i < 4; i++) {
    const p = pts[i];
    if (!p || !isFinite(p[0]) || !isFinite(p[1])) return false;
  }
  // Check consistent winding using cross products.
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % 4];
    const ex = b[0] - a[0];
    const ey = b[1] - a[1];
    const vx = px - a[0];
    const vy = py - a[1];
    const c = ex * vy - ey * vx;
    if (Math.abs(c) < 1e-12) continue;
    const s = c > 0 ? 1 : -1;
    if (sign === 0) sign = s;
    else if (s !== sign) return false;
  }
  return true;
}

function Minimap2D({ model, bbox, posRef, tgtRef, centroidsB64, cellIdsJson, quadRef, tileStateRef, onDemand }) {
  const canvasRef = useRef(null);
  const [tick, setTick] = useState(0);
  const centroidsRef = useRef(null);
  const cellIdsRef = useRef([]);
  useEffect(() => {
    const bytes = decodeB64ToBytes(centroidsB64);
    if (!bytes) { centroidsRef.current = null; return; }
    centroidsRef.current = new Float32Array(
      bytes.buffer,
      bytes.byteOffset,
      Math.floor(bytes.byteLength / 4),
    );
  }, [centroidsB64]);
  useEffect(() => {
    try {
      const ids = JSON.parse(cellIdsJson || "[]");
      cellIdsRef.current = Array.isArray(ids) ? ids : [];
    } catch {
      cellIdsRef.current = [];
    }
  }, [cellIdsJson]);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 110);
    return () => clearInterval(id);
  }, []);

  const onClick = useCallback(() => {}, []);
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || !bbox || bbox.length !== 6) return;
    const [minX, minY, , maxX, maxY] = bbox;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const w = cvs.width;
    const h = cvs.height;
    const pad = 6;
    const dx = Math.max(maxX - minX, 1e-9);
    const dy = Math.max(maxY - minY, 1e-9);
    const mapX = (x) => pad + ((x - minX) / dx) * (w - 2 * pad);
    const mapY = (y) => h - pad - ((y - minY) / dy) * (h - 2 * pad);
    ctx.fillStyle = "rgba(14,16,20,0.94)";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(110,130,165,0.55)";
    ctx.lineWidth = 1;
    ctx.strokeRect(pad + 0.5, pad + 0.5, w - 2 * pad - 1, h - 2 * pad - 1);

    // Tile grid + loaded/pending overlay.
    const st = tileStateRef ? tileStateRef.current : null;
    const idx = st && st.tilesIndex ? st.tilesIndex : null;
    const loaded = st && st.loadedKeys ? st.loadedKeys : null;
    const pending = st && st.pendingKeys ? st.pendingKeys : null;
    if (idx && idx.tiles && Array.isArray(idx.tiles)) {
      for (let i = 0; i < idx.tiles.length; i++) {
        const t = idx.tiles[i];
        const b = t.bbox;
        if (!b || b.length !== 6) continue;
        const x0 = mapX(b[0]);
        const y0 = mapY(b[1]);
        const x1 = mapX(b[3]);
        const y1 = mapY(b[4]);
        const rx = Math.min(x0, x1);
        const ry = Math.min(y0, y1);
        const rw = Math.abs(x1 - x0);
        const rh = Math.abs(y1 - y0);
        const key = `${t.col}_${t.row}`;
        const isLoaded = loaded && typeof loaded.has === "function" ? loaded.has(key) : false;
        const isPending = pending && typeof pending.has === "function" ? pending.has(key) : false;
        ctx.lineWidth = 1;
        ctx.strokeStyle = isLoaded ? "rgba(140,205,255,0.55)" : "rgba(110,130,165,0.18)";
        ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1);
        if (isLoaded) {
          ctx.fillStyle = "rgba(90,150,230,0.06)";
          ctx.fillRect(rx, ry, rw, rh);
        } else if (isPending) {
          ctx.fillStyle = "rgba(255,210,120,0.06)";
          ctx.fillRect(rx, ry, rw, rh);
        }
      }
    }

    const arr = centroidsRef.current;
    if (arr && arr.length >= 2) {
      const counts = new Uint16Array(w * h);
      for (let i = 0; i + 1 < arr.length; i += 2) {
        const px = mapX(arr[i]);
        const py = mapY(arr[i + 1]);
        const xi = px | 0;
        const yi = py | 0;
        if (xi < 0 || yi < 0 || xi >= w || yi >= h) continue;
        const idx = yi * w + xi;
        if (counts[idx] < 65535) counts[idx] += 1;
      }
      const img = ctx.getImageData(0, 0, w, h);
      const data = img.data;
      for (let i = 0; i < counts.length; i++) {
        const c = counts[i];
        if (!c) continue;
        const a = Math.min(0.9, 0.18 + 0.22 * Math.log2(1 + c));
        const off = i * 4;
        data[off + 0] = Math.min(255, data[off + 0] + (160 * a));
        data[off + 1] = Math.min(255, data[off + 1] + (210 * a));
        data[off + 2] = Math.min(255, data[off + 2] + (255 * a));
      }
      ctx.putImageData(img, 0, 0);
    }

    // Ray-plane viewport quad (approx frustum footprint at zRef).
    const q = quadRef ? quadRef.current : null;
    if (q && q.pts && q.pts.length === 4) {
      const p0 = q.pts[0];
      if (Number.isFinite(p0[0]) && Number.isFinite(p0[1])) {
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mapX(q.pts[0][0]), mapY(q.pts[0][1]));
        for (let i = 1; i < 4; i++) ctx.lineTo(mapX(q.pts[i][0]), mapY(q.pts[i][1]));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
    const px = posRef.current.x;
    const py = posRef.current.y;
    const tx = tgtRef.current.x;
    const ty = tgtRef.current.y;
    const vx = tx - px;
    const vy = ty - py;
    const len = Math.sqrt(vx * vx + vy * vy) || 1;
    const seg = Math.max(dx, dy) * 0.1;
    ctx.strokeStyle = "rgba(85,150,230,0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mapX(px), mapY(py));
    ctx.lineTo(mapX(px + (vx / len) * seg), mapY(py + (vy / len) * seg));
    ctx.stroke();
    ctx.fillStyle = "rgba(150,210,255,0.95)";
    ctx.beginPath();
    ctx.arc(mapX(px), mapY(py), 3.2, 0, Math.PI * 2);
    ctx.fill();
  }, [bbox, posRef, tgtRef, tick, quadRef, tileStateRef]);
  if (!bbox || bbox.length !== 6) return null;
  return h(
    "div",
    { className: "polyrender-minimap polyrender-float polyrender-float--panel", "aria-label": "XY overview" },
    h("div", { className: "polyrender-minimap-title" }, "XY"),
    h("canvas", {
      ref: canvasRef,
      className: "polyrender-minimap-canvas",
      width: 176,
      height: 132,
      onClick,
    }),
  );
}

// ---------------------------------------------------------------------------
// Scene root — chrome state owned by PolyrenderView
// ---------------------------------------------------------------------------

/**
 * R3F canvas + minimap + HUD. Soft Float cambar lives in PolyrenderView.
 *
 * @param {object} props
 * @param {object} props.model anywidget model
 * @param {number} props.opacity
 * @param {boolean} props.wireframe
 * @param {string} props.background
 * @param {boolean} props.showGrid
 * @param {number} props.zMin
 * @param {number} props.zMax
 * @param {{ id: number, preset: string } | null} props.viewCommand
 * @param {number} props.frameTick
 */
export function PolyrenderScene({
  model,
  opacity = 1,
  wireframe = false,
  background = "#111418",
  showGrid = true,
  zMin = 0,
  zMax = 1,
  viewCommand = null,
  frameTick = 0,
}) {
  const tileServerUrl = useTrait(model, "tile_server_url");
  const tilesJsonPath = useTrait(model, "tiles_json_path");
  const bbox = useTrait(model, "bbox");
  const maxFetches = useTrait(model, "max_concurrent_fetches");
  const centroidsB64 = useTrait(model, "centroids_xy_b64");
  const centroidsCellIdsJson = useTrait(model, "centroids_cell_ids_json");
  const onDemand = useTrait(model, "on_demand");
  const maxOrbitDistance = useTrait(model, "max_orbit_distance");

  const camPosRef = useRef(new THREE.Vector3());
  const camTgtRef = useRef(new THREE.Vector3());
  const tileStateRef = useRef({ tilesIndex: null, loadedKeys: null, pendingKeys: null });
  const quadRef = useRef({ zRef: 0, pts: [] });

  const hasBbox = bbox && bbox.length === 6;
  const bboxKey = hasBbox ? bbox.join(",") : "";
  const hasServer = !!tileServerUrl;

  const clipPlanes = useMemo(() => {
    if (!hasBbox) return null;
    const bz0 = bbox[2];
    const bz1 = bbox[5];
    if (!zBandClipActive(zMin, zMax, bz0, bz1)) return null;
    return buildZClipPlanes(zMin, zMax);
  }, [hasBbox, bbox, zMin, zMax]);

  return h(
    React.Fragment,
    null,
    h(
      Canvas,
      {
        frameloop: "demand",
        camera: { fov: 45, near: 0.01, far: 10000, position: [1, 1, 2] },
        style: { background: background || "#111418" },
        gl: { antialias: true, logarithmicDepthBuffer: true },
        shadows: true,
        dpr: [1, 2],
        onCreated: ({ gl, camera }) => {
          camera.up.set(0, 0, 1);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.localClippingEnabled = true;
        },
      },
      h(AdaptiveDpr),
      h(DemandInvalidate, { opacity }),
      h("ambientLight", { intensity: 0.32 }),
      h("hemisphereLight", {
        args: ["#bcd6f5", "#1b2128", 0.45],
        position: [0, 0, 1],
      }),
      hasBbox && h(KeyLight, { bbox }),
      h("directionalLight", { position: [-3, -2, -4], intensity: 0.22 }),
      h(Environment, { preset: "city", background: false }),
      h(ZUpOrbitControls),
      hasBbox &&
        h(
          Bounds,
          { fit: false, clip: false, observe: false, margin: 1.35 },
          h(
            "group",
            null,
            hasServer &&
              h(TileManager, {
                tileServerUrl,
                tilesJsonPath,
                wireframe,
                opacity,
                maxFetches,
                clipPlanes,
                minimapRef: tileStateRef,
                maxOrbitDistance,
              }),
            h(BoundsRefit, { frameTick, bboxKey, bbox, viewCommand, maxOrbitDistance }),
          ),
        ),
      hasBbox && h(CameraStream, { posRef: camPosRef, tgtRef: camTgtRef }),
      hasBbox && h(ViewportQuadStream, { quadRef, zRefMode: "target", zMin, zMax }),
      hasBbox && showGrid && h(ReferenceGrid, { bbox, clipPlanes }),
      hasBbox && h(ShadowFloor, { bbox, clipPlanes }),
      h(GizmoHelper, { alignment: "bottom-right", margin: [80, 88] },
        h(GizmoViewport, { labels: ["X", "Y", "Z"] })),
    ),
    h(Minimap2D, {
      model,
      bbox: hasBbox ? bbox : null,
      posRef: camPosRef,
      tgtRef: camTgtRef,
      centroidsB64,
      cellIdsJson: centroidsCellIdsJson,
      quadRef,
      tileStateRef,
      onDemand: !!onDemand,
    }),
    h(
      "div",
      { className: "polyrender-hud-stack polyrender-float polyrender-float--panel" },
      h(
        "div",
        { className: "polyrender-hud-line" },
        tileServerUrl
          ? (onDemand ? `on-demand tiles from ${tileServerUrl}` : `streaming from ${tileServerUrl}`)
          : (onDemand ? "on-demand tiles" : "waiting for tile server…"),
      ),
      onDemand
        ? h(
            "div",
            { className: "polyrender-hud-line" },
            `cap=${Number(maxOrbitDistance) || 0}`,
          )
        : null,
    ),
  );
}

export default PolyrenderScene;
