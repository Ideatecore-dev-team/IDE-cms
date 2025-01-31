import Joi from "joi";

const createTeamSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
  position: Joi.string().required().messages({
    "string.empty": "Position is required",
  }),
  image: Joi.string().required().uri().messages({
    "string.uri": "Image url is not valid",
    "string.empty": "Image is required",
  }),
  link: Joi.string().required().uri().messages({
    "string.uri": "Link url is not valid",
    "string.empty": "Link is required",
  }),
  categoryTeamId: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
});

export { createTeamSchema };
