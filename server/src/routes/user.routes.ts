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

export default router;
