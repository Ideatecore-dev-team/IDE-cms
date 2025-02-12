import Joi from "joi";

const createProgramSchema = Joi.object({
  image: Joi.string().required().uri().messages({
    "string.uri": "Image url is not valid",
    "string.empty": "Image is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  programCategoryId: Joi.string().required().messages({
    "string.empty": "program category is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
});

export { createProgramSchema };
