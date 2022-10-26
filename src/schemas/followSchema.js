import Joi from "joi";

const followSchema = Joi.object({
  userId: Joi.number().required()
});

export default followSchema;
