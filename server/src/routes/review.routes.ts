import { Router } from "express";

import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

import { upload } from "../middleware/upload.middleware.js";

const reviewRouter = Router();

reviewRouter.get("/", getReviews);

reviewRouter.get("/:id", getReview);

reviewRouter.post("/", upload.single("image"), createReview);

reviewRouter.patch("/:id", upload.single("image"), updateReview);

reviewRouter.delete("/:id", deleteReview);

export default reviewRouter;
