import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import CustomError from "../utils/CustomError.js";
import { createCategoryQuery, listCategoryQuery } from "../dbOperations/categoryStatements.js";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.body;
  const user_id = req.user.id;

  const result = await db.query(createCategoryQuery, [category, user_id]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Category failed to create"));
  }

  res.status(200).json({
    status: "success",
    message: "Category created successfully",
  });
});

export const listCategory = asyncHandler(async (req, res, next) => {
  const [result] = await db.query(listCategoryQuery);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Failed to list category"));
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});
