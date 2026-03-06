import Joi from "joi";

export const createProductSchema = Joi.object({
  category_id: Joi.number().strict().required().label("Category ID"),
  product: Joi.string().trim().required().label("Product"),
  description: Joi.string().trim().required().label("Description"),
  price: Joi.number().strict().required().label("Price"),
  stock: Joi.number().strict().required().label("Stock"),
});
