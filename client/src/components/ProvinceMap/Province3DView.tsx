import type { Province } from "../../types/province";
import PlaceMarker from "./PlaceMarker";

interface Props {
  province: Province;
}

const PADDING = 16;
const EXTRUDE_LAYERS = 12;
const EXTRUDE_STEP = 1.5;
const EXTRUDE_DEPTH = EXTRUDE_LAYERS * EXTRUDE_STEP;
const TILT_DEG = 30;

/** Linear-interpolate between two hex colors, t in [0, 1] */
function lerpColor(a: string, b: string, t: number) {
  const ah = parseInt(a.slice(1), 16);
  const bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;
  const br = (bh >> 16) & 0xff;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

const Province3DView = ({ province }: Props) => {
  const { x, y, width, height } = province.bbox;
  const viewBoxW = width + PADDING * 2;
  const viewBoxH = height + PADDING * 2 + EXTRUDE_DEPTH;
  const viewBox = `${x - PADDING} ${y - PADDING} ${viewBoxW} ${viewBoxH}`;
  const tilt = `rotateX(${TILT_DEG}deg)`;

  return (
    // Slightly smaller than before (max-w-xs instead of max-w-sm)
    <div className="relative w-full max-w-xs animate-[fadeIn_0.4s_ease-out]" style={{ perspective: "1400px" }}>
      <svg
        viewBox={viewBox}
        className="h-auto w-full drop-shadow-[0_28px_30px_rgba(59,47,30,0.35)]"
        style={{ transform: tilt, transformStyle: "preserve-3d" }}
        role="img"
        aria-label={`3D relief of ${province.name} Province`}
      >
        {/* Extruded "sides" — stacked copies fading darker to fake depth */}
        {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
          <path
            key={i}
            d={province.path}
            transform={`translate(0, ${(i + 1) * EXTRUDE_STEP})`}
            fill={lerpColor("#C9A968", "#4A3820", i / (EXTRUDE_LAYERS - 1))}
            stroke="none"
          />
        ))}

        {/* Top face */}
        <path d={province.path} fill="#E0C98A" stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
      </svg>

      {/* Plain HTML overlay for the markers — sharing the SVG's tilt so it stays
          aligned, and never clipped the way SVG foreignObject content was. */}
      <div
        className="absolute inset-0"
        style={{ transform: tilt, transformStyle: "preserve-3d" }}
      >
        {province.historicalPlaces.map((place) => (
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

export default Province3DView;