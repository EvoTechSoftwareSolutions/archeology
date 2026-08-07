import { useEffect, useState } from 'react';
import { API_V1 } from '../utils/imageUtils';
import type { ReviewItem } from '../types/heritagePlaceDetails.types';

export const useReviews = () => {
  const [reviewCards, setReviewCards] = useState<ReviewItem[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setReviewError(null);
        const res = await fetch(`${API_V1}/reviews?all=true`, { credentials: 'include' });
        const responseText = await res.text();
        let json: any = { data: [] };

        if (responseText) {
          try {
            json = JSON.parse(responseText);
          } catch {
            json = { data: [] };
          }
        }

        if (!res.ok) {
          throw new Error(json?.message || 'Failed to load reviews.');
        }

        const publicReviews = (json.data ?? []).map((review: any) => ({
          name: review.reviewerName || 'Guest Reviewer',
          role: review.reviewerRole || 'Visitor',
          review: review.reviewText || '',
          image: review.image || null,
          rating: Number(review.rating) || 5,
        }));

        setReviewCards(publicReviews);
        if (publicReviews.length === 0) {
          setReviewError('No reviews were returned by the API.');
        }
      } catch (error) {
        console.error('useReviews loadReviews error:', error);
        setReviewCards([]);
        setReviewError('Unable to load visitor reviews.');
      }
    };

    void loadReviews();
  }, []);

  return { reviewCards, reviewError };
};