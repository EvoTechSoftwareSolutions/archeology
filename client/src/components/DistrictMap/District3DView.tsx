import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
const ENTRANCE_ANIMATION_MS = 500; // matches the 0.4s fadeIn + a small buffer

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

/**
 * Click-driven progressive disclosure for the open card:
 *  0 = closed
 *  1 = image preview — header image with Name + District overlay
 *  2 = expanded — same image, plus description/"View Details" sliding up smoothly
 */
type CardStage = 0 | 1 | 2;

const District3DView = ({ district, historicalPlaces }: Props) => {
  // Only track WHICH marker is hovered here; WHERE to position the tooltip
  // is measured in a layout effect below.
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const [hoverAnchor, setHoverAnchor] = useState<CardAnchor | null>(null);

  const [openId, setOpenId] = useState<number | string | null>(null);
  const [stage, setStage] = useState<CardStage>(0);
  const [anchor, setAnchor] = useState<CardAnchor | null>(null);

  // Blocks hover/click measurement until the wrapper's entrance animation
  // has finished settling. Measuring mid-animation is what caused the
  // "tooltip appears in the wrong place, then jumps" flicker on first hover.
  const [ready, setReady] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Map<number | string, HTMLButtonElement | null>>(new Map());

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), ENTRANCE_ANIMATION_MS);
    return () => clearTimeout(timeout);
  }, []);

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

  const hoveredPlace = historicalPlaces.find((p, i) => (p.id ?? i) === hoveredId) ?? null;
  const openPlace = historicalPlaces.find((p, i) => (p.id ?? i) === openId) ?? null;

  const handleHover = (place: HistoricalPlace | null, id: number | string) => {
    if (!ready) return;
    // Don't show the hover tooltip on top of a card that's already open.
    if (openId === id) return;
    setHoveredId(place ? id : null);
  };

  // Measures the hover tooltip's position synchronously, after DOM commit
  // but before paint — so it always appears already in the right place.
  useLayoutEffect(() => {
    if (hoveredId === null) {
      setHoverAnchor(null);
      return;
    }
    setHoverAnchor(measureAnchor(hoveredId));
  }, [hoveredId]);

  // Step 2: click the marker (right under the hover tooltip) → opens the image preview card.
  // Clicking the marker again while a card is open closes it entirely.
  const handleMarkerClick = (id: number | string) => {
    if (!ready) return;
    setHoveredId(null);

    if (openId === id) {
      setOpenId(null);
      setStage(0);
      return;
    }

    setOpenId(id);
    setStage(1);
  };

  // Measure the open card's anchor the same way — synchronously, right after openId changes.
  useLayoutEffect(() => {
    if (openId === null) {
      setAnchor(null);
      return;
    }
    setAnchor(measureAnchor(openId));
  }, [openId]);

  // Step 3: click the open image card again → reveal the description, sliding up smoothly.
  const handleCardClick = () => {
    setStage((prev) => (prev === 1 ? 2 : prev));
  };

  const closeCard = () => {
    setOpenId(null);
    setStage(0);
  };

  useEffect(() => {
    if (openId === null) return;
    const recompute = () => setAnchor(measureAnchor(openId));
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [openId]);

  // Close the card on outside click, and on Escape.
  useEffect(() => {
    if (openId === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        closeCard();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openId]);

  const { x, y, width, height } = district.bbox;
  const viewBoxW = width + PADDING * 2;
  const viewBoxH = height + PADDING * 2 + EXTRUDE_DEPTH;
  const viewBox = `${x - PADDING} ${y - PADDING} ${viewBoxW} ${viewBoxH}`;

  return (
    <div
      ref={wrapperRef}
      onAnimationEnd={() => setReady(true)}
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
                isOpen={openId === id}
                onClick={() => handleMarkerClick(id)}
                onHover={(p) => handleHover(p, id)}
              />
            );
          })}
        </div>
      </div>

      {/* Step 1 — Hover Tooltip: Name + Century + District (wider, left-aligned) */}
      {hoveredPlace && hoverAnchor && !openPlace && (
        <div
          className="pointer-events-none absolute z-40 flex w-[min(220px,70vw)] flex-col items-start rounded-xl border border-[#E0C98A] bg-white/95 px-3.5 py-2 text-left shadow-lg backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
          style={{
            left: `${hoverAnchor.left}px`,
            top: `${hoverAnchor.top}px`,
            transform: "translate(-50%, calc(-100% - 12px))",
          }}
        >
          <p className="font-serif text-[14px] font-bold leading-tight text-[#2B2118]">
            {hoveredPlace.name}
          </p>
          <p className="text-[12px] font-semibold text-[#A67C52]">
            {[hoveredPlace.century, district.name].filter(Boolean).join(" • ")}
          </p>

          <div className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#E0C98A] bg-white" />
        </div>
      )}

      {/* Step 2 & 3 — Click Card: image preview, then description sliding up */}
      {openPlace && anchor && (
        <div
          className="absolute z-50 flex w-[min(200px,60vw)] flex-col overflow-hidden rounded-2xl border border-[#E0C98A] text-white shadow-2xl transition-[width] duration-300 ease-out"
          style={{
            left: `${anchor.left}px`,
            top: `${anchor.top}px`,
            transform: "translate(-50%, calc(-100% - 14px))",
          }}
        >
          {/* Header image — Name + District overlay (Step 2) */}
          <button
            type="button"
            onClick={handleCardClick}
            aria-label={stage === 1 ? "Show more details" : undefined}
            className="relative block h-24 w-full flex-shrink-0 animate-[fadeIn_0.3s_ease-out]"
          >
            {openPlace.image ? (
              <img
                src={openPlace.image}
                alt={openPlace.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-stone-800" />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 text-left">
              <p className="font-serif text-xs font-bold leading-tight drop-shadow">
                {openPlace.name}
              </p>
              <p className="text-[10px] text-amber-200 drop-shadow">{district.name}</p>
            </div>
          </button>

          {/* Step 3 — description + View Details, sliding smoothly bottom → top */}
          <div
            className={`overflow-hidden bg-white backdrop-blur-md transition-all duration-500 ease-out ${
              stage === 2 ? "max-h-64 border-t border-[#E0C98A]/40" : "max-h-0 border-t-0"
            }`}
          >
            <div
              className={`flex flex-col items-start justify-start gap-2 p-3 text-left transition-all duration-500 ease-out ${
                stage === 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="line-clamp-4 text-left text-[11px] leading-snug text-black">
                {openPlace.description}
              </p>

              {openPlace.id ? (
                
                <a  href={`/places/${openPlace.id}`}
                  className="block text-left text-[11px] font-bold text-amber-500 hover:underline"
                >
                  View Details
                </a>
              ) : null}
            </div>
          </div>

          <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#E0C98A] bg-stone-900 pointer-events-none" />
        </div>
      )}
    </div>
  );
};

export default District3DView;