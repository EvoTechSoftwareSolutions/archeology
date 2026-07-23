import type { HistoricalPlace } from "../../types/province";

interface Props {
  place: HistoricalPlace;
}

const HistoricalPlaceCard = ({ place }: Props) => {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#E0C98A]/50 bg-white/60 p-3">
      <img
        src={place.image}
        alt={place.name}
        className="h-16 w-16 flex-shrink-0 rounded-md border border-[#E0C98A] object-cover"
      />
      <div>
        <h4 className="font-serif text-sm font-semibold text-[#3B2F1E]">
          {place.name}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-[#5C4A2A]">
          {place.description}
        </p>
      </div>
    </div>
  );
};

export default HistoricalPlaceCard;
