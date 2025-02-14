import Joi from "joi";

const createProgramCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Category name is required",
  }),
});

export { createProgramCategorySchema };
