import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email is not valid",
      "string.empty": "Email is required",
    }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
});

export { loginSchema };
