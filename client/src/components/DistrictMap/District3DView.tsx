import type { District } from "../../types/district";
import PlaceMarker from "../ProvinceMap/PlaceMarker";

interface Props {
  district: District;
}

const PADDING = 16;
const EXTRUDE_LAYERS = 16;
const EXTRUDE_STEP = 1.5;
const EXTRUDE_DEPTH = EXTRUDE_LAYERS * EXTRUDE_STEP;
const TILT_DEG = 20;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** Shade a hex color darker (t=0) to darkest (t=1), used for the extruded sides */
function shade(hex: string, t: number) {
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - t * 0.75; // fades toward ~25% brightness at the base
  const rr = Math.round(r * factor);
  const gg = Math.round(g * factor);
  const bb = Math.round(b * factor);
  return `rgb(${rr}, ${gg}, ${bb})`;
}

const District3DView = ({ district }: Props) => {
  const { x, y, width, height } = district.bbox;
  const viewBoxW = width + PADDING * 2;
  const viewBoxH = height + PADDING * 2 + EXTRUDE_DEPTH;
  const viewBox = `${x - PADDING} ${y - PADDING} ${viewBoxW} ${viewBoxH}`;
  const tilt = `rotateX(${TILT_DEG}deg)`;

  return (
    <div className="relative w-full max-w-xs animate-[fadeIn_0.4s_ease-out]" style={{ perspective: "1400px" }}>
      <svg
        viewBox={viewBox}
        className="h-auto w-full drop-shadow-[0_28px_30px_rgba(59,47,30,0.35)]"
        style={{ transform: tilt, transformStyle: "preserve-3d" }}
        role="img"
        aria-label={`3D relief of ${district.name} District`}
      >
        {/* Extruded "sides" — stacked copies fading darker to fake depth */}
        {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
          <path
            key={i}
            d={district.path}
            transform={`translate(0, ${(i + 1) * EXTRUDE_STEP})`}
            fill={shade(district.color, i / (EXTRUDE_LAYERS - 1))}
            stroke="none"
          />
        ))}

        {/* Top face, in the district's own color */}
        <path d={district.path} fill={district.color} stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
      </svg>

      {/* Plain HTML overlay for the marker, sharing the SVG's tilt so it stays aligned */}
      <div className="absolute inset-0" style={{ transform: tilt, transformStyle: "preserve-3d" }}>
        {district.historicalPlaces.map((place) => (
          <PlaceMarker
            key={place.name}
            place={place}
            leftPct={((place.anchorXPct * width + x - (x - PADDING)) / viewBoxW) * 100}
            topPct={((place.anchorYPct * height + y - (y - PADDING)) / viewBoxH) * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default District3DView;
