import * as reviewRepo from "../repositories/review.repository.js";

export const getAllReviews = () => reviewRepo.getAllReviews();

export const getActiveReviews = () => reviewRepo.getActiveReviews();

export const getReviewById = (id: number) => reviewRepo.getReviewById(id);

export const createReview = (data: {
  reviewerName: string;
  reviewerRole?: string;
  image?: string;
  rating?: number;
  reviewText: string;
  isActive?: boolean;
}) => reviewRepo.createReview(data);

export const updateReview = (
  id: number,
  data: {
    reviewerName?: string;
    reviewerRole?: string;
    image?: string;
    rating?: number;
    reviewText?: string;
    isActive?: boolean;
  }
) => reviewRepo.updateReview(id, data);

<<<<<<< HEAD
export const deleteReview = (id: number) => reviewRepo.deleteReview(id);
=======
export const deleteReview = (id: number) => reviewRepo.deleteReview(id);
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
