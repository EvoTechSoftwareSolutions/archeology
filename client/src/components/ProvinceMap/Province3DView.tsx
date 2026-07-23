import { useState } from "react";
import type { Province } from "../../types/province";

interface Props {
  province: Province;
}

const PADDING = 16;
const EXTRUDE_LAYERS = 16;
const EXTRUDE_STEP = 1.5;
const EXTRUDE_DEPTH = EXTRUDE_LAYERS * EXTRUDE_STEP;

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { x, y, width, height } = province.bbox;

  const viewBox = `${x - PADDING} ${y - PADDING} ${width + PADDING * 2} ${
    height + PADDING * 2 + EXTRUDE_DEPTH
  }`;

  return (
    <div
      className="w-full max-w-md border-2"
      style={{ perspective: "1400px" }}
    >
      <svg
        viewBox={viewBox}
        className="h-auto w-full drop-shadow-[0_28px_30px_rgba(59,47,30,0.35)]"
        style={{
          transform: "rotateX(20deg)",
          transformStyle: "preserve-3d",
        }}
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
        <path
          d={province.path}
          fill="#E0C98A"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Heritage place markers, sitting on the top face */}
        {province.historicalPlaces.map((place, i) => {
          const mx = x + place.anchorXPct * width;
          const my = y + place.anchorYPct * height;
          const isActive = activeIndex === i;

          return (
            <g key={place.name}>
              <g
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={place.name}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(isActive ? null : i);
                  }
                }}
              >
                {isActive && (
                  <circle
                    cx={mx}
                    cy={my}
                    r={9}
                    fill="none"
                    stroke="#C1483F"
                    strokeWidth={1.5}
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={mx}
                  cy={my}
                  r={6}
                  fill={isActive ? "#C1483F" : "#3B2F1E"}
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                />
              </g>

              {isActive && (
                <foreignObject
                  x={Math.min(Math.max(mx - 95, x - PADDING), x + width + PADDING - 190)}
                  y={my + 10}
                  width={190}
                  height={116}
                  style={{ overflow: "visible" }}
                >
                  <div className="flex items-start gap-2 rounded-lg border border-[#E0C98A] bg-white/95 p-2 shadow-lg">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-10 w-10 flex-shrink-0 rounded border border-[#E0C98A] object-cover"
                    />
                    <div>
                      <p className="font-mono text-[12px] font-semibold leading-tight text-[#000]">
                        {place.name}
                      </p>
                      <p className="mt-0.5 text-[8px] leading-snug text-[#5C4A2A]">
                        {place.description}
                      </p>
                    </div>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Province3DView;
