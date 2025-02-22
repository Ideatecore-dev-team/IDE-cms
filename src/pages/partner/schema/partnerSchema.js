import Joi from "joi";

const createPartnerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Name is required" }),
  image: Joi.string().required().uri().messages({
    "string.uri": "Image url is not valid",
    "string.empty": "Image is required",
  }),
  link: Joi.string()
    .optional()
    // .uri()
    .messages({
      "string.uri": "Link url is not valid",
      "string.empty": "Link is required",
    })
    .default("-")
    .empty("-"),
});

export { createPartnerSchema };
