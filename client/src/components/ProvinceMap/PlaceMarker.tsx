import { forwardRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import type { HistoricalPlace } from "../../types/district";

interface Props {
  place?: HistoricalPlace;
  leftPct: number;
  topPct: number;
  onClick: () => void;
}

const PlaceMarker = forwardRef<HTMLButtonElement, Props>(
  ({ leftPct, topPct, onClick }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="absolute -translate-x-1/2 -translate-y-full"
        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
        onClick={onClick}
        aria-label="View heritage place"
      >
        <FaMapMarkerAlt
          className="animate-bounce text-red-600 drop-shadow"
          style={{
            width: "clamp(18px, 4vw, 26px)",
            height: "clamp(18px, 4vw, 26px)",
          }}
        />
      </button>
    );
  }
);

PlaceMarker.displayName = "PlaceMarker";

export default PlaceMarker;