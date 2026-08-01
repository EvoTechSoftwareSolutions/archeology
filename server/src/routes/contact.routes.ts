import express from "express";
import {
  createMessage,
  getMessages,
  getStats,
  updateMessageStatus,
  deleteMessage,
  replyMessage,
} from "../controllers/contact.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/", createMessage);


// Admin routes
router.use(authenticate);

router.use(authorize("ADMIN"));


router.get("/messages", getMessages);

router.get("/stats", getStats);

router.patch(
  "/messages/:id",
  updateMessageStatus
);

router.delete(
  "/messages/:id",
  deleteMessage
);

router.post(
  "/messages/:id/reply",
  replyMessage
);


export default router;