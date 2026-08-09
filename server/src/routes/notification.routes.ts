import express from "express";
import {
  getNotificationSummary,
  markContactsRead,
  markSubscribersRead,
} from "../controllers/notification.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN", "SUPERADMIN"));

router.get("/summary", getNotificationSummary);
router.patch("/contacts/mark-read", markContactsRead);
router.patch("/newsletter/mark-seen", markSubscribersRead);

export default router;
