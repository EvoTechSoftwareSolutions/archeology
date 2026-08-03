import type { HistoricalPlace } from "../../types/district";


interface Props {
  place: HistoricalPlace;
  leftPct: number;
  topPct: number;
  onClick?: () => void;
}

const PlaceMarker = ({ place, leftPct, topPct, onClick }: Props) => {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={place.name}
        className="transition-transform duration-200 hover:scale-110"
      >
        <svg
          width="30"
          height="38"
          viewBox="0 0 24 30"
          className="drop-shadow-[0_3px_4px_rgba(0,0,0,0.35)]"
        >
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 8.4 10.2 16.8 11.2 17.6a1.3 1.3 0 0 0 1.6 0C13.8 28.8 24 20.4 24 12c0-6.63-5.37-12-12-12z"
            fill="#EA4335"
            stroke="#C5221F"
            strokeWidth="0.5"
          />
          <ellipse
            cx="8.5"
            cy="7"
            rx="4"
            ry="5.5"
            fill="#FFFFFF"
            opacity="0.45"
          />
          <circle cx="12" cy="12.5" r="4.2" fill="#FFFFFF" />
          <circle
            cx="12"
            cy="12.5"
            r="4.2"
            fill="none"
            stroke="#C4271B"
            strokeWidth="0.6"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlaceMarker;