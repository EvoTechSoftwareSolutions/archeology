import type { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/review.service.js";

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // If ?all=true is passed (admin), return all reviews; otherwise return active only
    const reviews = req.query.all === "true"
      ? await reviewService.getAllReviews()
      : await reviewService.getActiveReviews();

    return res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const review = await reviewService.getReviewById(id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    return res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reviewerName, reviewerRole, image, rating, reviewText, isActive } = req.body;

    if (!reviewerName || !reviewText) {
      return res.status(400).json({ success: false, message: "reviewerName and reviewText are required" });
    }

    const review = await reviewService.createReview({
      reviewerName,
      reviewerRole,
      image,
      rating: rating ? parseInt(rating) : 5,
      reviewText,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { reviewerName, reviewerRole, image, rating, reviewText, isActive } = req.body;

    const updated = await reviewService.updateReview(id, {
      reviewerName,
      reviewerRole,
      image,
      rating: rating !== undefined ? parseInt(rating) : undefined,
      reviewText,
      isActive: isActive !== undefined ? Boolean(isActive) : undefined,
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    await reviewService.deleteReview(id);
    return res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
