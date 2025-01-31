import Joi from "joi";

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().min(8).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
  }),
  newPassword: Joi.string().required().min(8).messages({
    "string.empty": "New password is required",
    "string.min": "New password must be at least 8 characters",
  }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Konfirmasi password harus sama dengan password baru",
      "string.empty": "Confirm password is required",
    }),
});

export { changePasswordSchema };
