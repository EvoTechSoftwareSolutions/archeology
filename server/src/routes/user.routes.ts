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

// Admin only
router.use(authorize("ADMIN"));

// User management
router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);


export default router;
