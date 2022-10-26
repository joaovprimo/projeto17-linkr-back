import Joi from "joi";

const postSchema = Joi.object({
  url: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  userId: Joi.number().required(),

});

export default postSchema;
