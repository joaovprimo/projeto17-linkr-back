import { stripHtml } from "string-strip-html";

function signupValidations(req, res, next) {
  try {
    req.body.username = stripHtml(req.body.username).result.trim();
    req.body.email = stripHtml(req.body.email).result.trim();
  } catch (error) {
    console.log(error.message);
  }
  next();
}

export { signupValidations };
