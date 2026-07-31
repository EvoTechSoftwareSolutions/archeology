import { Router } from "express";
import { newsletterController } from "../controllers/newsletter.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  subscribeNewsletterSchema,
  updateNewsletterSubscriberSchema,
} from "../validations/newsletter.validation.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.post("/subscribe", validate(subscribeNewsletterSchema), newsletterController.subscribe);
router.get("/stats", newsletterController.getStats);

router.use(authenticate, authorize("ADMIN"));

router.get(
  "/subscribers",
  newsletterController.getSubscribers,
);
router.post(
  "/subscribers",
  validate(subscribeNewsletterSchema),
  newsletterController.subscribe,
);
router.patch(
  "/subscribers/:id",
  validate(updateNewsletterSubscriberSchema),
  newsletterController.updateSubscriber,
);
router.delete("/subscribers/:id", newsletterController.deleteSubscriber);

export default router;
