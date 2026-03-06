import Joi from "joi";

export const addToCartSchema = Joi.object({
  product_id: Joi.number().strict().required().label("Product ID"),
  quantity: Joi.number().strict().required().label("Quantity"),
});

export const updateCartSchema = Joi.object({
  cart_id: Joi.number().strict().required().label("Cart ID"),
  quantity: Joi.number().strict().required().label("Quantity"),
});
