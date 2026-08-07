import { Router } from "express";

import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
} from "../controllers/district.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createDistrictSchema,
  updateDistrictSchema,
} from "../validations/district.validation.js";

const router = Router();

// PUBLIC ROUTES

// Get all districts
router.get("/", getDistricts);

// Get district by id
router.get("/:id", getDistrictById);

// ADMIN ROUTES

// Create district
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  validate(createDistrictSchema),
  createDistrict,
);

// Update district
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  validate(updateDistrictSchema),
  updateDistrict,
);

// Delete district
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  deleteDistrict,
);

export default router;
