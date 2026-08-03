import { Router } from "express";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.get("/", getReviews);
reviewRouter.get("/:id", getReview);
reviewRouter.post("/", createReview);
reviewRouter.patch("/:id", updateReview);
reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;