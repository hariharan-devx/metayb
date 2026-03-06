import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { createProductSchema } from "../validations/productValidation.js";
import {
  createProduct,
  listProduct,
  listProductByCategory,
  listProductById,
} from "../controllers/productController.js";
import { fileUpload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/product/create-product",
  authMiddleware,
  validateRequest(createProductSchema),
  fileUpload.single("image"),
  createProduct,
);
router.get("/product/list-product", authMiddleware, listProduct);
router.get("/product/list-product/:id", authMiddleware, listProductById);
router.get("/product/list-product-by-category/:id", authMiddleware, listProductByCategory);

export default router;
