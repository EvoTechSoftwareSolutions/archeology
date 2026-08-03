import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../validations/category.validation.js";

const router = Router();

router.get("/", getCategories);
router.post("/", validate(createCategorySchema), createCategory);
router.patch("/:id", validate(updateCategorySchema), updateCategory);
router.delete("/:id", deleteCategory);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
