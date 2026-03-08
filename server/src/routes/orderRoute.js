import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { createOrderSchema } from "../validations/orderValidation.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/order/create-order", authMiddleware, validateRequest(createOrderSchema), createOrder);
router.get("/order/my-orders", authMiddleware, getMyOrders);
export default router;
