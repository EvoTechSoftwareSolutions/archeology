
import { Router } from "express";

import {
  createHistoricalPlace,
  getHistoricalPlaces,
  getActiveHistoricalPlaces,
  getHistoricalPlaceById,
  getNearbyHistoricalPlaces,
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

// ============================================================
// CREATE HISTORICAL PLACE
// ============================================================

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

// ============================================================
// GET ALL HISTORICAL PLACES
// ============================================================

router.get("/", getHistoricalPlaces);

// ============================================================
// GET ALL ACTIVE HISTORICAL PLACES
// ============================================================

router.get("/active", getActiveHistoricalPlaces);

// ============================================================
// GET NEARBY HISTORICAL PLACES
// ============================================================
//
// Example:
// GET /api/v1/historicalPlace/10/nearby
// ?districtId=3&anchorXPct=0.45&anchorYPct=0.30
//
// IMPORTANT:
// This route must be before "/:id".
// ============================================================

router.get("/:id/nearby", getNearbyHistoricalPlaces);

// ============================================================
// GET SINGLE HISTORICAL PLACE
// ============================================================

router.get("/:id", getHistoricalPlaceById);

// ============================================================
// UPDATE HISTORICAL PLACE
// ============================================================

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

// ============================================================
// TOGGLE ACTIVE / INACTIVE STATUS
// ============================================================

router.put("/:id/toggle-status", toggleHistoricalPlaceActive);

// ============================================================
// DELETE HISTORICAL PLACE
// ============================================================

router.delete("/:id", deleteHistoricalPlace);

export default router;

