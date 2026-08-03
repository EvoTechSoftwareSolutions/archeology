import { Router } from "express";
<<<<<<< HEAD
import multer from "multer";
import path from "path";
import { uploadImage } from "../controllers/upload.controller.js";

const uploadRouter = Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

uploadRouter.post("/", upload.single("image"), uploadImage);

export default uploadRouter;
=======
import { uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const router = Router();


router.post(
 "/image",
 upload.single("image"),
 uploadImage
);


export default router;
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
