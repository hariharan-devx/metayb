import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { createCategorySchema } from "../validations/categoryValidation.js";
import { createCategory, listCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/category/create-category", authMiddleware, validateRequest(createCategorySchema), createCategory);
router.get("/category/list-category", authMiddleware, listCategory);

export default router;
