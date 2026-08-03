import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { loginRateLimiter } from "../middleware/rateLimit.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/register", validate(registerSchema), authController.register);
<<<<<<< HEAD:server/dist/routes/userAuth.routes.js
router.post("/login", loginRateLimiter, validate(loginSchema), authController.login);
router.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Protected route",
        user: req.user,
    });
});
export default router;
=======

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
>>>>>>> 0104ec4c5c1151c42b5d1879414deec1a4e3e886:server/src/routes/userAuth.routes.ts
