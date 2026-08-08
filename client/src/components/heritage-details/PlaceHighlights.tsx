import type { Slide } from '../../types/heritagePlaceDetails.types';

interface PlaceHighlightsProps {
  highlightCards: Slide[];
  onOpenCard: (card: Slide) => void;
}

const PlaceHighlights = ({ highlightCards, onOpenCard }: PlaceHighlightsProps) => {
  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-8 pb-10 md:pb-12 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {highlightCards.map((card, idx) => {
          const displayTitle = card.subtitle || card.title || `Gallery Image ${idx + 1}`;
          return (
            <button
              key={`${displayTitle}-${idx}`}
              type="button"
              onClick={() => onOpenCard(card)}
              className="relative group overflow-hidden aspect-[16/9] bg-black rounded-lg text-left shadow-md border border-gray-800/50 cursor-pointer"
            >
              <img
                src={card.image}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-5">
                <h4 className="font-serif text-white text-center font-semibold text-sm sm:text-base md:text-lg tracking-wide drop-shadow-md group-hover:text-amber-300 transition-colors">
                  {displayTitle}
                </h4>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PlaceHighlights;