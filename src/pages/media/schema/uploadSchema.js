import Joi from "joi";

const uploadSchema = Joi.object({
  image: Joi.any()
    .required()
    .custom((value, helpers) => {
      // Custom validation to check if a file is an image
      if (!value || value.length === 0) {
        return helpers.message("Please select an image file.");
      }
      const file = value[0];
      if (!file.type.startsWith("image/")) {
        return helpers.message("Only image files are allowed.");
      }
      return value;
    }),
});

export { uploadSchema };
