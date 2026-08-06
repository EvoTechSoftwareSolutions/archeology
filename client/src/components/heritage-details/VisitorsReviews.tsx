import avatarImg from '../../assets/avatar.png';
import { resolveImageUrl } from '../../utils/imageUtils';
import type { ReviewItem } from '../../types/heritagePlaceDetails.types';

interface VisitorsReviewsProps {
  reviews: ReviewItem[];
  reviewError: string | null;
}

const VisitorsReviews = ({ reviews, reviewError }: VisitorsReviewsProps) => {
  const visibleReviewCards = reviews.slice(0, 3);

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center relative">
      <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">COMMUNITY</p>
      <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Visitors Reviews</h3>

      <div className="overflow-hidden rounded-[24px] flex justify-center">
        <div className="review-carousel-track flex gap-6 text-left pb-4">
          {visibleReviewCards.length > 0 ? (
            visibleReviewCards.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="review-card bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 shrink-0 w-[280px] sm:w-[320px] md:w-[320px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={resolveImageUrl(item.image, avatarImg)}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                    onError={(event) => {
                      event.currentTarget.src = avatarImg;
                    }}
                  />
                  <div>
                    <h5 className="font-bold text-[1rem] text-[#1f2937]">{item.name}</h5>
                    <p className="text-[#6b7280] text-[0.75rem]">{item.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 text-[#C89B3C] text-[0.8rem] mb-4">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex}>{starIndex < (item.rating ?? 5) ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className="text-[#4b5563] text-[0.95rem] leading-relaxed">"{item.review}"</p>
              </div>
            ))
          ) : (
            <div className="w-full bg-white rounded-[24px] p-10 shadow-sm border border-gray-100">
              <p className="text-[#6b7280] mb-2">No reviews are available at the moment. Please check back later.</p>
              {reviewError && <p className="text-[#b91c1c] text-[0.95rem]">{reviewError}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VisitorsReviews;