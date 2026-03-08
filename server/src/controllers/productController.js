import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import CustomError from "../utils/CustomError.js";
import {
  createProductQuery,
  listProductQuery,
  listProductByIdQuery,
  listProductByCategoryQuery,
} from "../dbOperations/productStatements.js";
import { checkCategoryExistQuery } from "../dbOperations/categoryStatements.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { category_id, product, description, price, stock } = req.body;
  const user_id = req.user.id;

  if (!req.file) {
    return next(new CustomError(400, "Product image is required"));
  }

  const image = req.file ? req.file.filename : null;

  const [category] = await db.query(checkCategoryExistQuery, [category_id]);

  if (!category || category.length === 0) {
    return next(new CustomError(404, "Invalid categoty ID"));
  }

  const result = await db.query(createProductQuery, [category_id, product, description, price, image, stock, user_id]);

  if (!result || result.affectedRows === 0) {
    return next(new CustomError(404, "Product failed to create"));
  }

  res.status(200).json({
    status: "success",
    message: "Product created successfully",
  });
});

export const listProduct = asyncHandler(async (req, res, next) => {
  const [result] = await db.query(listProductQuery);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Failed to list product"));
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const listProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const [result] = await db.query(listProductByIdQuery, [id]);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Failed to list product"));
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const listProductByCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const [result] = await db.query(listProductByCategoryQuery, [id]);

  if (!result || result.length === 0) {
    return next(new CustomError(404, "Failed to list product"));
  }
  res.status(200).json({
    status: "success",
    data: result,
  });
});
