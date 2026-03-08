import Joi from "joi";

export const createOrderSchema = Joi.object({
  shipping_address: Joi.string().trim().required().label("Address"),
});
