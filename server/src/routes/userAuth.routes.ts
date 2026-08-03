import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { loginRateLimiter } from "../middleware/rateLimit.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post(
  "/login",
  validate(loginSchema),
  authController.login,
);

// Get current logged-in user
router.get("/me", authenticate, authController.getMe);

// Logout
router.post("/logout", authenticate, authController.logout);

export default router;