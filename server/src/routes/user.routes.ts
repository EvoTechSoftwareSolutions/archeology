import { Router } from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();

// All user management routes require login
router.use(authenticate);

// Only ADMIN can manage users
router.use(authorize("ADMIN"));

router.get("/", getAllUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
