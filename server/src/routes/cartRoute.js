import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { addToCartSchema, updateCartSchema } from "../validations/cartValidation.js";
import { addToCart, getCart, removeCartItem, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/add-to-cart", authMiddleware, validateRequest(addToCartSchema), addToCart);
router.get("/cart/get-cart", authMiddleware, getCart);
router.put("/cart/update-cart", authMiddleware, validateRequest(updateCartSchema), updateCart);
router.delete("/cart/delete-cart/:id", authMiddleware, removeCartItem);

export default router;
