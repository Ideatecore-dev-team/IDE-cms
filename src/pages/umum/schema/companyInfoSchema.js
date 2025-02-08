import Joi from "joi";

const companyInfoSchema = Joi.object({
  id: Joi.string().optional(), // Allow id
  createdAt: Joi.date().optional(), // Allow timestamps
  updatedAt: Joi.date().optional(),
  name: Joi.string().required().messages({
    "string.empty": "name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description is required",
  }),
  title: Joi.string().required().messages({
    "string.empty": "title is required",
  }),
  image: Joi.string().required().uri().messages({
    "string.uri": "Image url is not valid",
    "string.empty": "Image is required",
  }),
  Phone: Joi.string().required().messages({
    "string.empty": "Phone is required",
  }),
  Address: Joi.string().required().messages({
    "string.empty": "Address is required",
  }),
  Email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email is not valid",
      "string.empty": "Email is required",
    }),
  Facebook: Joi.string().required().uri().messages({
    "string.uri": "Facebook url is not valid",
    "string.empty": "Facebook is required",
  }),
  Instagram: Joi.string().required().uri().messages({
    "string.uri": "Instagram url is not valid",
    "string.empty": "Instagram is required",
  }),
  Twitter: Joi.string().required().uri().messages({
    "string.uri": "Twitter url is not valid",
    "string.empty": "Twitter is required",
  }),
  Linkedin: Joi.string().required().uri().messages({
    "string.uri": "Linkedin url is not valid",
    "string.empty": "Linkedin is required",
  }),
  Youtube: Joi.string().required().uri().messages({
    "string.uri": "Youtube url is not valid",
    "string.empty": "Youtube is required",
  }),
  Tiktok: Joi.string().required().uri().messages({
    "string.uri": "Tiktok url is not valid",
    "string.empty": "Tiktok is required",
  }),
});

export { companyInfoSchema };
