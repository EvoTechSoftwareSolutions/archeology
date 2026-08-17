import { Router } from "express";
import { newsletterController } from "../controllers/newsletter.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// ==========================================
// Public Routes (No Authentication Required)
// ==========================================

// Public subscription endpoint
router.post(
  "/subscribe",
  newsletterController.subscribe
);

// Public unsubscribe route (supports both GET link clicks and POST requests)
router.get("/unsubscribe/:token", newsletterController.unsubscribe);
router.post("/unsubscribe", newsletterController.unsubscribe);

// Protected Routes (ADMIN / SUPERADMIN Only)

router.use(authenticate, authorize("ADMIN", "SUPERADMIN"));

router.get("/stats", newsletterController.getStats);
router.post("/campaigns/send", newsletterController.sendCampaign);

router.get("/subscribers", newsletterController.getSubscribers);
router.post(
  "/subscribers",
  newsletterController.subscribe
);
router.put(
  "/subscribers/:id",
  newsletterController.updateSubscriber
);
router.delete("/subscribers/:id", newsletterController.deleteSubscriber);

export default router;