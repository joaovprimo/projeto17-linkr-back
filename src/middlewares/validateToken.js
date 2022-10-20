import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from 'http-status-codes'

dotenv.config();

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Error: empty token");
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.user = verifiedUser;
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Error: invalid token");
  }
  next();
}
