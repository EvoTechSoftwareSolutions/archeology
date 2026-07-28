import { useState } from "react";
import type { HistoricalPlace } from "../../types/province";

interface Props {
  place: HistoricalPlace;
  /** Position as a percentage of the map's rendered box */
  leftPct: number;
  topPct: number;
}

const PlaceMarker = ({ place, leftPct, topPct }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
    >
      <div className="relative flex flex-col items-center">
        {/* Popup card: photo, name, description. Stays open until toggled closed. */}
        <div
          className={`absolute bottom-full left-1/2 z-20 w-[210px] -translate-x-1/2 mb-2 rounded-2xl border border-[#E0C98A] bg-white shadow-xl transition-all duration-300 ease-out ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <img
            src={place.image}
            alt={place.name}
            className="h-24 w-full rounded-t-2xl object-cover"
          />
          <div className="p-3">
            <p className="font-serif text-[13px] font-bold leading-tight text-[#2B2118]">
              {place.name}
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#4A3D2B]">
              {place.description}
            </p>
          </div>
          <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 border-b border-r border-[#E0C98A] bg-white" />
        </div>

        {/* Red, polished map-pin marker */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={place.name}
          className="transition-transform duration-200 ease-out hover:scale-110"
        >
          <svg
            width="30"
            height="38"
            viewBox="0 0 24 30"
            className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.35)]"
          >
            <defs>
              <radialGradient id={`pin-${place.name}`} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#F04438" />
                <stop offset="55%" stopColor="#D92D20" />
                <stop offset="100%" stopColor="#912018" />
              </radialGradient>
            </defs>
            <path
  d="M12 0C5.37 0 0 5.37 0 12c0 8.4 10.2 16.8 11.2 17.6a1.3 1.3 0 0 0 1.6 0C13.8 28.8 24 20.4 24 12c0-6.63-5.37-12-12-12z"
  fill="#EA4335"
  stroke="#C5221F"
  strokeWidth="0.5"
/>
            {/* glossy highlight */}
            <ellipse cx="8.5" cy="7" rx="4" ry="5.5" fill="#FFFFFF" opacity="0.45" />
            <circle cx="12" cy="12.5" r="4.2" fill="#FFFFFF" />
            <circle cx="12" cy="12.5" r="4.2" fill="none" stroke="#C4271B" strokeWidth="0.6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PlaceMarker;