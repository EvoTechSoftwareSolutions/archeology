import { useEffect, useRef, useState } from "react";
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
  return `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`;
}

interface CardAnchor {
  id: number | string;
  left: number;
  top: number;
}

const District3DView = ({ district, historicalPlaces }: Props) => {
  const [openId, setOpenId] = useState<number | string | null>(null);
  const [anchor, setAnchor] = useState<CardAnchor | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Map<number | string, HTMLButtonElement | null>>(new Map());

  const measureAnchor = (id: number | string) => {
    const wrapperEl = wrapperRef.current;
    const markerEl = markerRefs.current.get(id);
    if (!wrapperEl || !markerEl) return null;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const markerRect = markerEl.getBoundingClientRect();

    return {
      id,
      left: markerRect.left + markerRect.width / 2 - wrapperRect.left,
      top: markerRect.top - wrapperRect.top,
    };
  };

  const togglePlace = (id: number | string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      setAnchor(next === null ? null : measureAnchor(id));
      return next;
    });
  };

  useEffect(() => {
    if (openId === null) return;
    const recompute = () => setAnchor(measureAnchor(openId));
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [openId]);

  const { x, y, width, height } = district.bbox;
  const viewBoxW = width + PADDING * 2;
  const viewBoxH = height + PADDING * 2 + EXTRUDE_DEPTH;
  const viewBox = `${x - PADDING} ${y - PADDING} ${viewBoxW} ${viewBoxH}`;

  const openPlace = historicalPlaces.find((p, i) => (p.id ?? i) === openId) ?? null;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-[260px] animate-[fadeIn_0.4s_ease-out] sm:max-w-xs"
    >
      <div style={{ perspective: "1400px" }}>
        <svg
          viewBox={viewBox}
          className="h-auto w-full drop-shadow-[0_28px_30px_rgba(59,47,30,0.35)]"
          style={{ transform: `rotateX(${TILT_DEG}deg)`, transformStyle: "preserve-3d" }}
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
          <path
            d={district.path}
            fill={district.color}
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div
          className="absolute inset-0"
          style={{ transform: `rotateX(${TILT_DEG}deg)`, transformStyle: "preserve-3d" }}
        >
          {historicalPlaces.map((place, i) => {
            const id = place.id ?? i;
            const norm = (v: number) => (v > 1 ? v / 100 : v);
            const ax = norm(place.anchorXPct);
            const ay = norm(place.anchorYPct);
            const px = x + ax * width;
            const py = y + ay * height;
            const leftPct = ((px - (x - PADDING)) / viewBoxW) * 100;
            const topPct = ((py - (y - PADDING)) / viewBoxH) * 100;


            return (
              <PlaceMarker
                key={id}
               ref={(el) => {
  markerRefs.current.set(id, el);
}}
                place={place}
                leftPct={leftPct}
                topPct={topPct}
                onClick={() => togglePlace(id)}
              />
            );
          })}
        </div>
      </div>

      {openPlace && anchor && (
        <div
          className="absolute z-50 flex max-h-[220px] w-[min(200px,60vw)] flex-col rounded-2xl border border-[#E0C98A] bg-white shadow-xl"
          style={{
            left: `${anchor.left}px`,
            top: `${anchor.top}px`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          {openPlace.image ? (
            <img
              src={openPlace.image}
              alt={openPlace.name}
              className="h-20 w-full flex-shrink-0 rounded-t-2xl object-cover"
            />
          ) : null}

          <div className="overflow-y-auto p-3 break-words">
            <p className="font-serif text-[13px] font-bold leading-tight text-[#2B2118]">
              {openPlace.name}
            </p>

            <p className="mt-1 text-[11px] leading-snug text-[#4A3D2B]">
              {openPlace.description}
            </p>

            {openPlace.id ? (
              <a
                href={`/places/${openPlace.id}`}
                className="mt-2 block text-[11px] font-bold text-[#A67C52] hover:underline"
              >
                View Details
              </a>
            ) : null}
          </div>

          <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#E0C98A] bg-white pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export default District3DView;