import joi from "joi";

const newUserSchema = joi.object({
    username: joi.string().min(6).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(12).required(),
    pictureUrl: joi.string().pattern(new RegExp("^https://")).required(),
  });
  
  const newLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  export {newUserSchema, newLoginSchema}