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
  createHistoricalPlace,
);

// GET ALL HISTORICAL PLACES
router.get("/", getHistoricalPlaces);

// GET SINGLE HISTORICAL PLACE
router.get("/:id", getHistoricalPlaceById);

// UPDATE HISTORICAL PLACE
router.put(
  "/:id",
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
  validate(updateHistoricalPlaceSchema),
  updateHistoricalPlace,
);

// DELETE HISTORICAL PLACE
router.delete("/:id", deleteHistoricalPlace);

export default router;
