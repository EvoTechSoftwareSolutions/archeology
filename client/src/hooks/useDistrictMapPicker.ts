import { useCallback, useState } from "react";
import { svgPointToLatLng } from "../utils/geoTransform";
import type { District } from "../types/district";

export interface PickedLocation {
  latitude: number;
  longitude: number;
  anchorXPct: number;
  anchorYPct: number;
  districtId: number;
}

/**
 * Logic only — attach `handleDistrictClick` to the onClick of your
 * existing district <path> elements. It reads the click position
 * relative to the clicked path's own bounding box, in SVG user units,
 * so it works regardless of pan/zoom/CSS scaling.
 *
 * Usage on your existing SVG:
 *   <path
 *     d={district.path}
 *     onClick={(e) => handleDistrictClick(e, district)}
 *     ...your existing props/classes, untouched
 *   />
 */
export default function useDistrictMapPicker(
  onPick: (location: PickedLocation) => void
) {
  const [lastPicked, setLastPicked] = useState<PickedLocation | null>(null);

  const handleDistrictClick = useCallback(
    (
      event: React.MouseEvent<SVGPathElement>,
      district: District,
      /** Pass the numeric DB district id — see districtApiIds mapping */
      apiDistrictId: number
    ) => {
      const svg = event.currentTarget.ownerSVGElement;
      if (!svg) return;

      // Convert the click's screen position into this SVG's own
      // viewBox coordinate space, so it's correct at any zoom/scale.
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const svgPoint = point.matrixTransform(ctm.inverse());

      const { x, y, width, height } = district.bbox;
      const anchorXPct = Math.min(100, Math.max(0, ((svgPoint.x - x) / width) * 100));
      const anchorYPct = Math.min(100, Math.max(0, ((svgPoint.y - y) / height) * 100));
      const { latitude, longitude } = svgPointToLatLng(svgPoint.x, svgPoint.y);

      const location: PickedLocation = {
        latitude: Number(latitude.toFixed(4)),
        longitude: Number(longitude.toFixed(4)),
        anchorXPct: Number(anchorXPct.toFixed(1)),
        anchorYPct: Number(anchorYPct.toFixed(1)),
        districtId: apiDistrictId,
      };

      setLastPicked(location);
      onPick(location);
    },
    [onPick]
  );

  return { handleDistrictClick, lastPicked };
}
