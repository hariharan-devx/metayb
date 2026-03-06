import bcrypt from "bcrypt";
import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import { generateToken } from "../utils/jwt.js";
import { loginUserQuery, signupUserQuery } from "../dbOperations/userStatements.js";
import CustomError from "../utils/CustomError.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [newUser] = await db.query(signupUserQuery, [name, email, hashedPassword]);

  if (!newUser || newUser.affectedRows === 0) {
    return next(new CustomError(404, "User failed to add"));
  }

  res.status(201).json({
    status: "success",
    message: "Signup successful",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await db.query(loginUserQuery, [email]);

  if (!user || user.length === 0) {
    return next(new CustomError(404, "User not found"));
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);

  if (!isPasswordValid) {
    return next(new CustomError(401, "Invalid password"));
  }
  const tokenPayload = { id: user[0].id };

  generateToken(tokenPayload, 200, res);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: "success", message: "Logged out successfully" });
});
