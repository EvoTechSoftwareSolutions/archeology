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
  loginRateLimiter,
  validate(loginSchema),
  authController.login,
);

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Protected route",
    user: (req as any).user,
  });
});

export default router;
