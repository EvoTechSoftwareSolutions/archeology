import { useState } from "react";
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
  const [openName, setOpenName] = useState<string | null>(null);

  const togglePlace = (name: string) => {
    setOpenName((prev) => (prev === name ? null : name));
  };


  const { x, y, width, height } = province.bbox ?? { x: 0, y: 0, width: 100, height: 100 };
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
        aria-label={`3D relief of ${province.name} Province`}
      >
        {/* Extruded "sides" */}
        {Array.from({ length: EXTRUDE_LAYERS }).map((_, i) => (
          <path
            key={i}
            d={province.path ?? ""}
            transform={`translate(0, ${(i + 1) * EXTRUDE_STEP})`}
            fill={lerpColor("#C9A968", "#4A3820", i / (EXTRUDE_LAYERS - 1))}
            stroke="none"
          />
        ))}
        {/* Top face */}
        <path d={province.path ?? ""} fill="#E0C98A" stroke="#FFFFFF" strokeWidth={2} strokeLinejoin="round" />
      </svg>

      {/* Marker + popup overlay */}
      <div
        className="absolute inset-0"
        style={{ transform: tilt, transformStyle: "preserve-3d" }}
      >
        {(province.historicalPlaces ?? []).map((place) => {
          const leftPct = ((place.anchorXPct * width + x - (x - PADDING)) / viewBoxW) * 100;
          const topPct = ((place.anchorYPct * height + y - (y - PADDING)) / viewBoxH) * 100;
          const isOpen = openName === place.name;

          return (
            <>
              <PlaceMarker
                key={`marker-${place.name}`}
                place={place}
                leftPct={leftPct}
                topPct={topPct}
                onClick={() => togglePlace(place.name)}
              />

              {isOpen && (
                <div
                  key={`card-${place.name}`}
                  className="absolute z-50 w-[200px] rounded-2xl border border-[#E0C98A] bg-white shadow-xl"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: "translate(-50%, calc(-100% - 40px))",
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
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#1C5F46] hover:text-[#C89B3C] transition-colors"
                      >
                        View Details →
                      </a>
                    )}
                  </div>

                  {/* Arrow */}
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

export default Province3DView;