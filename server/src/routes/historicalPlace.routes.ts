import { Router } from "express";

import {
  createHistoricalPlace,
  getHistoricalPlaces,
  getActiveHistoricalPlaces,
  getHistoricalPlaceById,
  updateHistoricalPlace,
  toggleHistoricalPlaceActive,
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
router.get("/active", getActiveHistoricalPlaces);

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

// TOGGLE ACTIVE / INACTIVE STATUS
router.put("/:id/toggle-status", toggleHistoricalPlaceActive);
// DELETE HISTORICAL PLACE
router.delete("/:id", deleteHistoricalPlace);

export default router;
