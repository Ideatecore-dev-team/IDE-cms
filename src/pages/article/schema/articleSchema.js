import Joi from "joi";

const createArticleSchema = Joi.object({
  image: Joi.string().required().uri().messages({
    "string.uri": "Image url is not valid",
    "string.empty": "Image is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  categoryId: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  description: Joi.string().optional().empty("-").messages({
    "string.empty": "Description is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

export { createArticleSchema };
