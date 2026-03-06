import asyncHandler from "../utils/asyncHandler.js";
import db from "../config/mysqlConfig.js";
import CustomError from "../utils/CustomError.js";
import {
  addToCartQuery,
  checkExisitingCartQuery,
  getCartQuery,
  getProductQueryQuery,
  updateExistingCartQuery,
  updateCartQuery,
  checkCartIdQuery,
  deleteCartQuery,
} from "../dbOperations/cartStatements.js";

export const addToCart = asyncHandler(async (req, res, next) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  const [product] = await db.query(getProductQueryQuery, [product_id]);

  if (!product.length) {
    return next(new CustomError(404, "Product not found"));
  }

  if (product[0].stock < quantity) {
    return next(new CustomError(400, "Insufficient stock"));
  }

  const [existing] = await db.query(checkExisitingCartQuery, [user_id, product_id]);

  if (existing.length > 0) {
    await db.query(updateExistingCartQuery, [quantity, existing[0].id]);
  } else {
    await db.query(addToCartQuery, [user_id, product_id, quantity]);
  }

  res.status(200).json({
    status: "success",
    message: "Product added to cart",
  });
});

export const getCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  const [cart] = await db.query(getCartQuery, [user_id]);

  if (!cart || !cart.length) {
    return next(new CustomError(404, "Cart is empty"));
  }

  res.json({
    status: "success",
    cart,
  });
});

export const updateCart = asyncHandler(async (req, res, next) => {
  const { cart_id, quantity } = req.body;
  const user_id = req.user.id;

  const [cart] = await db.query(checkCartIdQuery, [cart_id]);

  if (!cart.length) {
    return next(new CustomError(404, "Cart not found"));
  }

  const [updateCart] = await db.query(updateCartQuery, [quantity, cart_id, user_id]);

  if (!updateCart || updateCart.affectedRows === 0) {
    return next(new CustomError(404, "Failed to update cart"));
  }

  res.json({
    status: "success",
    message: "Cart updated success",
  });
});

export const removeCartItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const [cart] = await db.query(checkCartIdQuery, [id]);

  if (!cart.length) {
    return next(new CustomError(404, "Cart not found"));
  }

  const [deleteCart] = await db.query(deleteCartQuery, [id, user_id]);

  if (!deleteCart || deleteCart.affectedRows === 0) {
    return next(new CustomError(404, "Failed to delete cart"));
  }

  res.json({
    status: "success",
    message: "Item removed from cart",
  });
});
