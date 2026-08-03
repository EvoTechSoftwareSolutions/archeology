import express from "express";
import { register, login, logout, getMe } from "../controllers/userAuth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
=======
router.post("/register", validate(registerSchema), authController.register);

router.post(
  "/login",
  validate(loginSchema),
  authController.login,
);

// Get current logged-in user
router.get("/me", authenticate, authController.getMe);
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c

// Logout
router.post("/logout", authenticate, authController.logout);

export default router;