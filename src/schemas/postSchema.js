import Joi from "joi";

const postSchema = Joi.object({
  url: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  userId: Joi.number().required(),
  reposterId: Joi.number().allow(null, ''),
});

export default postSchema;
