import type { Slide } from '../../types/heritagePlaceDetails.types';

interface PlaceHighlightsProps {
  highlightCards: Slide[];
  onOpenCard: (card: Slide) => void;
}

const PlaceHighlights = ({ highlightCards, onOpenCard }: PlaceHighlightsProps) => {
  return (
    <section className="max-w-[1400px] mx-auto px-5 md:px-8 pb-10 md:pb-12 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {highlightCards.map((card, idx) => (
          <button
            key={`${card.subtitle}-${idx}`}
            type="button"
            onClick={() => onOpenCard(card)}
            className="relative group overflow-hidden aspect-[16/9] bg-black rounded-[2px] text-left"
          >
            <img
              src={card.image}
              alt={card.title || card.subtitle || 'Highlight image'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/25 to-transparent" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default PlaceHighlights;