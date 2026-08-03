import type { HistoricalPlace } from "../../types/district";

interface Props {
  place: HistoricalPlace;
  onClose?: () => void; // Add this line
}

const HistoricalPlaceCard = ({ place, onClose }: Props) => {
  return (
    <div className="relative rounded-lg bg-white p-4 shadow-lg">
      {/* Optional Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          aria-label="Close card"
        >
          ✕
        </button>
      )}

      {/* Your card content */}
      <h3 className="font-bold text-lg">{place.name}</h3>
      {/* ... rest of your card UI ... */}
    </div>
  );
};

export default HistoricalPlaceCard;