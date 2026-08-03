import { useMemo } from "react";
import { districts } from "../../data/districts";
import { svgPointToLatLng } from "../../utils/geoTransform";

interface Props {
  selectedDistrictName: string;
  anchorXPct: string;
  anchorYPct: string;
  onLocationPick: (latitude: string, longitude: string, anchorXPct: string, anchorYPct: string) => void;
}

const PADDING = 16;

/**
 * Matches the admin's typed/selected district name against our SVG data.
 * Exact match first, then a loose "starts with" fallback — your DB's
 * district names and the SVG's names may not be spelled identically
 * (seen this already with "trinco" vs "Trincomalee").
 */
function findDistrictShape(name: string) {
  const target = name.trim().toLowerCase();
  if (!target) return null;
  return (
    districts.find((d) => d.name.toLowerCase() === target) ??
    districts.find(
      (d) => d.name.toLowerCase().startsWith(target) || target.startsWith(d.name.toLowerCase())
    ) ??
    null
  );
}

const LocationMapPicker = ({ selectedDistrictName, anchorXPct, anchorYPct, onLocationPick }: Props) => {
  const district = useMemo(() => findDistrictShape(selectedDistrictName), [selectedDistrictName]);

  if (!district) {
    return (
      <div className="w-full">
        <label className="block text-[14px] font-bold text-gray-800 mb-2">Pin Location</label>
        <div className="h-[320px] flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-400">
          Select a district above to place the marker
        </div>
      </div>
    );
  }

  const { x, y, width, height } = district.bbox;
  const viewBox = `${x - PADDING} ${y - PADDING} ${width + PADDING * 2} ${height + PADDING * 2}`;

  const hasPick = anchorXPct !== "" && anchorYPct !== "" && !Number.isNaN(Number(anchorXPct));
  const ax = hasPick ? Number(anchorXPct) : null;
  const ay = hasPick ? Number(anchorYPct) : null;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPoint = point.matrixTransform(ctm.inverse());

    const nextAx = Math.min(1, Math.max(0, (svgPoint.x - x) / width));
    const nextAy = Math.min(1, Math.max(0, (svgPoint.y - y) / height));
    const { latitude, longitude } = svgPointToLatLng(svgPoint.x, svgPoint.y);

    onLocationPick(
      latitude.toFixed(4),
      longitude.toFixed(4),
      nextAx.toFixed(3),
      nextAy.toFixed(3)
    );
  };

  return (
    <div className="w-full">
      <label className="block text-[14px] font-bold text-gray-800 mb-2">
        Pin Location — {district.name} District
      </label>
      <p className="text-[12px] text-gray-400 mb-2">Click the exact spot on the map below.</p>

      <svg
        viewBox={viewBox}
        onClick={handleClick}
        className="h-[320px] w-full max-w-md cursor-crosshair rounded-lg border border-gray-300 bg-gray-50"
        role="img"
        aria-label={`Click a location within ${district.name} District`}
      >
        <path
          d={district.path}
          fill={district.color}
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {ax !== null && ay !== null && (
          <g className="pointer-events-none">
            <circle cx={x + ax * width} cy={y + ay * height} r={7} fill="none" stroke="#D92D20" strokeWidth={2} />
            <circle cx={x + ax * width} cy={y + ay * height} r={3} fill="#D92D20" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default LocationMapPicker;
