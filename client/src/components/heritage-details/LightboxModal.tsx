import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Slide } from '../../types/heritagePlaceDetails.types';

interface LightboxModalProps {
  activeCard: Slide | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const LightboxModal = ({ activeCard, onClose, onNavigate }: LightboxModalProps) => {
  if (!activeCard) return null;

  const imageTitle = activeCard.subtitle || activeCard.title;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-3 sm:p-6 md:p-8 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] bg-[#0b0f19] shadow-2xl border border-gray-800"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 rounded-full bg-white/90 text-gray-900 p-2.5 shadow-xl transition-all hover:bg-white hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close image preview"
        >
          <FiX size={20} />
        </button>

        {/* Previous Button */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate('prev');
          }}
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Previous image"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNavigate('next');
          }}
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Next image"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Image Container with Text Overlay */}
        <div className="relative flex-1 min-h-[380px] max-h-[75vh] flex items-center justify-center bg-black overflow-hidden">
          <img
            src={activeCard.image}
            alt={imageTitle}
            className="h-full w-full max-w-full object-contain object-center"
          />

          {/* Bottom Overlay displaying Description on top of image */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-6 md:p-8 text-left z-20 pointer-events-none">
            {activeCard.title && activeCard.title !== imageTitle && (
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#C89B3C] mb-1 drop-shadow">
                {activeCard.title}
              </p>
            )}
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide leading-snug drop-shadow-md">
              {imageTitle}
            </h3>
            {activeCard.description && (
              <div className="mt-2.5 pt-2 border-t border-white/20 max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C89B3C] mb-1">Detailed Description</p>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed drop-shadow-md font-sans">
                  {activeCard.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;