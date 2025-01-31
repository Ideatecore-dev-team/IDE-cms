import Joi from "joi";

const createCategoryTeamSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Category name is required",
  }),
});

export { createCategoryTeamSchema };
