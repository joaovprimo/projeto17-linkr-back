import isValidUrl from "../regex/isValidUrl.js";
import postSchema from "../schemas/postSchema.js";

const beforePostMiddleware = async (req, res, next) => {
  const { url, description, userId } = req.body;

  const { error, value } = postSchema.validate({ url, description, userId });
  if (error)
    return res.status(500).send(error.details.map((value) => value.message));

  if (!isValidUrl(url))
    return res
      .status(422)
      .send("Certifique-se de que o campo enviado é uma URL válida");

  res.locals.body = { url, description, userId };
  next();
};

export default beforePostMiddleware;
