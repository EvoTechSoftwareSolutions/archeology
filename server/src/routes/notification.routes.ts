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
router.put("/contacts/mark-read", markContactsRead);
router.put("/newsletter/mark-seen", markSubscribersRead);

export default router;
