import express from "express";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { loginSchema, signupSchema } from "../validations/authValidation.js";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/signup", validateRequest(signupSchema), signup);
router.post("/auth/login", validateRequest(loginSchema), login);
router.post("/auth/logout", logout);

export default router;
