/**
 * Approximate SVG-pixel -> lat/lon conversion.
 *
 * This is a linear (equirectangular) approximation, NOT a real projection —
 * it assumes our map's pixel bounding box maps evenly onto Sri Lanka's real
 * geographic bounding box. It'll be roughly right (good enough for admin
 * tagging / pin placement) but not survey-accurate. If you need precision,
 * calibrate this with real reference points (e.g. 3+ known towns' actual
 * lat/lon vs their pixel position) and fit a proper affine transform instead.
 */

// Sri Lanka's real-world bounding box
const REAL_BOUNDS = {
  minLat: 5.9,
  maxLat: 9.9,
  minLon: 79.5,
  maxLon: 81.9,
};

// The full country SVG's own bounding box (viewBox "0 0 1000 1000")
const SVG_BOUNDS = {
  minX: 0,
  maxX: 1000,
  minY: 0,
  maxY: 1000,
};

export function svgPointToLatLng(x: number, y: number) {
  const lonT = (x - SVG_BOUNDS.minX) / (SVG_BOUNDS.maxX - SVG_BOUNDS.minX);
  const latT = (y - SVG_BOUNDS.minY) / (SVG_BOUNDS.maxY - SVG_BOUNDS.minY);

  const longitude = REAL_BOUNDS.minLon + lonT * (REAL_BOUNDS.maxLon - REAL_BOUNDS.minLon);
  // Latitude decreases as y increases (SVG y grows downward, south)
  const latitude = REAL_BOUNDS.maxLat - latT * (REAL_BOUNDS.maxLat - REAL_BOUNDS.minLat);

  return { latitude, longitude };
}
