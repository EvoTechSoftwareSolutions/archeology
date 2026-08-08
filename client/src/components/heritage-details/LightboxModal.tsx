import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Slide } from '../../types/heritagePlaceDetails.types';

interface LightboxModalProps {
  activeCard: Slide | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const LightboxModal = ({ activeCard, onClose, onNavigate }: LightboxModalProps) => {
  if (!activeCard) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mt-4 w-full max-w-5xl overflow-hidden rounded-[28px] bg-[#0f172a] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-8 z-10 rounded-full bg-black/55 p-2 text-white transition hover:bg-black/75"
          aria-label="Close image preview"
        >
          <FiX size={20} />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate('prev');
          }}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-black/75"
          aria-label="Previous image"
        >
          <FiChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate('next');
          }}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-black/75"
          aria-label="Next image"
        >
          <FiChevronRight size={22} />
        </button>
        <div className="flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden bg-black p-4 md:h-[78vh] md:min-h-[520px] md:p-6">
          <img
            src={activeCard.image}
            alt={activeCard.subtitle || activeCard.title}
            className="h-full w-full max-w-full object-contain object-center"
          />
        </div>
        <div className="space-y-2 bg-[#111827] px-6 py-5 text-white md:px-8">
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#C89B3C]">{activeCard.title}</p>
          <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">
            {activeCard.subtitle || activeCard.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;