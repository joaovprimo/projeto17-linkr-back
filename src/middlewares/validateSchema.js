import joi from 'joi';
import { StatusCodes } from "http-status-codes";

export function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const messageError = error.details.map((item) => item.message);
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(messageError);
    }
    next();
  };
}
