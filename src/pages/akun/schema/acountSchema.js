import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email is not valid",
      "string.empty": "Email is required",
    }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  password: Joi.string().required().min(8).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Konfirmasi password harus sama dengan password baru",
    "string.empty": "Confirm password is required",
  }),
});

const updateNameSchema = Joi.object({ name: Joi.string().required() });

const updatePasswordSchema = Joi.object({
  password: Joi.string().required().min(8).messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Konfirmasi password harus sama dengan password baru",
    "string.empty": "Confirm password is required",
  }),
});

export { registerSchema, updateNameSchema, updatePasswordSchema };
