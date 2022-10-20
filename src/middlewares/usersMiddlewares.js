import joi from "joi";
import { stripHtml } from "string-strip-html";

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

function signupValidations(req, res, next) {
  try {
    req.body.username = stripHtml(req.body.username).result.trim();
    req.body.email = stripHtml(req.body.email).result.trim();
  } catch (error) {
    console.log(error.message);
  }
  next();
}

export { signupValidations, newUserSchema, newLoginSchema };
