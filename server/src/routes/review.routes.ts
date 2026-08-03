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

<<<<<<< HEAD
export default reviewRouter;
=======
export default reviewRouter;
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
