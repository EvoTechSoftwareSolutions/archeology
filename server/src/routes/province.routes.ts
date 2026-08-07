import { Router } from "express";

import {
  createProvince,
  getProvinces,
  getProvinceById,
  updateProvince,
  deleteProvince,
} from "../controllers/province.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createProvinceSchema,
  updateProvinceSchema,
} from "../validations/province.validation.js";

const router = Router();

// PUBLIC ROUTES

// Get all provinces
router.get("/", getProvinces);

// Get province by id
router.get("/:id", getProvinceById);

// ADMIN ROUTES
// Create province
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  validate(createProvinceSchema),
  createProvince,
);

// Update province
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  validate(updateProvinceSchema),
  updateProvince,
);

// Delete province
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "SUPERADMIN"),
  deleteProvince,
);

export default router;
