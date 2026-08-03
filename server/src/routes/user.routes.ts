<<<<<<< HEAD
import express from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(protect);
router.use(authorize("ADMIN")); // Only ADMIN can manage users

router.route("/")
  .get(getAllUsers);

router.route("/:id")
  .put(updateUser)
  .delete(deleteUser);
=======
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
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c

export default router;
