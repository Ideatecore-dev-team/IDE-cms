import Joi from "joi";

const createCategorySchema = Joi.object({
  category: Joi.string().required().messages({
    "string.empty": "Category name is required",
  }),
});

export { createCategorySchema };
