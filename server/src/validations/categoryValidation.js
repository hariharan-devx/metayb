import Joi from "joi";

export const createCategorySchema = Joi.object({
  category: Joi.string().trim().required().label("Category"),
});
