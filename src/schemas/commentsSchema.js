import Joi from "joi";

const commentSchema = Joi.object({
  postId: Joi.number().required(),
  comment: Joi.string().required(),
});

export default commentSchema;
