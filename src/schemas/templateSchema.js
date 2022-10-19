import Joi from "joi";

const templateSchema = Joi.object({
  example: Joi.string().uri().required(),
});

export { templateSchema };
