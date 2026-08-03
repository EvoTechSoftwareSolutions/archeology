import { useState } from "react";
import type { District, HistoricalPlace } from "../../types/district";
import PlaceMarker from "../ProvinceMap/PlaceMarker";

interface Props {
  district: District;
  historicalPlaces: HistoricalPlace[];
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

function shade(hex: string, t: number) {
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - t * 0.75;
  const rr = Math.round(r * factor);
  const gg = Math.round(g * factor);
  const bb = Math.round(b * factor);
  return `rgb(${rr}, ${gg}, ${bb})`;
}

const District3DView = ({ district, historicalPlaces }: Props) => {
  // Every pin that's been clicked stays open; the most recently clicked
  // one is "active" (full opacity), the rest fade down.
const [openId, setOpenId] = useState<number | string | null>(null);

  const togglePlace = (id: number | string) => {
  setOpenId((prev) => (prev === id ? null : id));
};

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
        {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
          <path
            key={i}
            d={district.path}
            transform={`translate(0, ${(i + 1) * EXTRUDE_STEP})`}
            fill={shade(district.color, i / (EXTRUDE_LAYERS - 1))}
            stroke="none"
          />
        ))}

        <path d={district.path} fill={district.color} stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
      </svg>

      <div className="absolute inset-0" style={{ transform: tilt, transformStyle: "preserve-3d" }}>
        {historicalPlaces.map((place, i) => {
  const id = place.id ?? i;
  const isOpen = openId === id;
  const px = x + place.anchorXPct * width;
  const py = y + place.anchorYPct * height;

  const leftPct = ((px - (x - PADDING)) / viewBoxW) * 100;
  const topPct = ((py - (y - PADDING)) / viewBoxH) * 100;

  return (
    <>
      <PlaceMarker
        key={`marker-${id}`}
        place={place}
        leftPct={leftPct}
        topPct={topPct}
        onClick={() => togglePlace(id)}
      />

      {isOpen && (
        <div
          key={`card-${id}`}
          className="absolute z-50 w-[200px] -translate-x-1/2 rounded-2xl border border-[#E0C98A] bg-white shadow-xl transition-opacity duration-300"
          style={{
            left: `${leftPct}%`,
            top: `${topPct}%`,
            transform: "translate(-50%, calc(-100% - 40px))",
            opacity: 1,
          }}
        >
          {place.image && (
            <img
              src={place.image}
              alt={place.name}
              className="h-24 w-full rounded-t-2xl object-cover"
            />
          )}

          <div className="p-3">
            <p className="font-serif text-[13px] font-bold leading-tight text-[#2B2118]">
              {place.name}
            </p>

            <p className="mt-1 text-[11px] leading-snug text-[#4A3D2B]">
              {place.description}
            </p>

            {place.id && (
              <a
                href={`/places/${place.id}`}
                className="mt-2 block text-[11px] font-bold text-[#A67C52] hover:underline"
              >
                View Details
              </a>
            )}
          </div>

          <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#E0C98A] bg-white" />
        </div>
      )}
    </>
  );
})}
      </div>
    </div>
  );
};

export default District3DView;
