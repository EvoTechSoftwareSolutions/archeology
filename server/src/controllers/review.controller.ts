import type { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/review.service.js";

// GET ALL / ACTIVE REVIEWS
export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews =
      req.query.all === "true"
        ? await reviewService.getAllReviews()
        : await reviewService.getActiveReviews();

    return res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE REVIEW
export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const review = await reviewService.getReviewById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE REVIEW
export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reviewerName, reviewerRole, rating, reviewText, isActive } =
      req.body;

    if (!reviewerName || !reviewText) {
      return res.status(400).json({
        success: false,
        message: "reviewerName and reviewText are required",
      });
    }

    // Pass undefined instead of null
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const review = await reviewService.createReview({
      reviewerName,
      reviewerRole: reviewerRole || undefined,
      image,
      rating: rating ? Number(rating) : 5,
      reviewText,
      isActive: isActive !== undefined ? isActive === "true" : true,
    });

    return res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE REVIEW
export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const { reviewerName, reviewerRole, rating, reviewText, isActive, image } =
      req.body;

    const newImage = req.file ? `/uploads/${req.file.filename}` : image;

    const updated = await reviewService.updateReview(id, {
      reviewerName,

      reviewerRole: reviewerRole || undefined,

      image: newImage,

      rating: rating !== undefined ? Number(rating) : undefined,

      reviewText,

      isActive: isActive !== undefined ? isActive === "true" : undefined,
    });

    return res.json({
      success: true,

      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE REVIEW
export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    await reviewService.deleteReview(id);

    return res.json({
      success: true,

      message: "Review deleted",
    });
  } catch (error) {
    next(error);
  }
};
