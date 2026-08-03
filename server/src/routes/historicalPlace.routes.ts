import { Router } from "express";

import {
  createHistoricalPlace,
  getHistoricalPlaces,
  getHistoricalPlaceById,
  updateHistoricalPlace,
  deleteHistoricalPlace,
} from "../controllers/historicalPlace.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

import {
  createHistoricalPlaceSchema,
  updateHistoricalPlaceSchema,
} from "../validations/historicalPlace.validation.js";

const router = Router();

// CREATE HISTORICAL PLACE
router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 10,
    },
  ]),
  validate(createHistoricalPlaceSchema),
  createHistoricalPlace
);

router.get("/", getHistoricalPlaces);

router.get("/:id", getHistoricalPlaceById);

router.patch(
  "/:id",
  validate(updateHistoricalPlaceSchema),
  updateHistoricalPlace,
);

router.delete("/:id", deleteHistoricalPlace);

export default router;
