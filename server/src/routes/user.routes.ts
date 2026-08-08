import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  getUserById,
} from "../controllers/user.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();

// Login required
router.use(authenticate);

// Read users (ADMIN and SUPERADMIN)
router.get("/", authorize("ADMIN", "SUPERADMIN"), getAllUsers);
router.get("/:id", authorize("ADMIN", "SUPERADMIN"), getUserById);

// Change user state / Update user (SUPERADMIN ONLY)
router.put("/:id", authorize("SUPERADMIN"), updateUser);

export default router;
