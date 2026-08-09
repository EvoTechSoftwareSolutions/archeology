import { forwardRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { HistoricalPlace } from "../../types/district";

interface Props {
  place: HistoricalPlace;
  leftPct: number;
  topPct: number;
  isOpen?: boolean;
  onClick: () => void;
  onHover: (place: HistoricalPlace | null) => void;
}

const PlaceMarker = forwardRef<HTMLButtonElement, Props>(
  ({ place, leftPct, topPct, isOpen = false, onClick, onHover }, ref) => {
    return (
      <div
        className="group absolute -translate-x-1/2 -translate-y-full"
        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
        onMouseEnter={() => onHover(place)}
        onMouseLeave={() => onHover(null)}
      >
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          aria-label={`View ${place.name}`}
          aria-expanded={isOpen}
        >
          <FaMapMarkerAlt
            className={`drop-shadow transition-transform duration-300 group-hover:scale-125 ${
              isOpen ? "scale-125 text-amber-500" : "text-red-600"
            }`}
            style={{
              width: "clamp(18px, 4vw, 26px)",
              height: "clamp(18px, 4vw, 26px)",
            }}
          />
        </button>
      </div>
    );
  }
);

PlaceMarker.displayName = "PlaceMarker";

export default PlaceMarker;