import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from 'http-status-codes'
import { searchSessionForToken } from "../repositories/userRepository.js";

dotenv.config();

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Error: empty token");
  }
  try {
    const session = await searchSessionForToken({token});
    if(!session){
      return res.status(StatusCodes.UNAUTHORIZED).send("Error: token not found");
    }
    if(!session.isValid){
      return res.status(StatusCodes.UNAUTHORIZED).send("Error: invalid token ");
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.user = verifiedUser;
  } catch (error) {
    console.log(error.message)
    return res.status(StatusCodes.UNAUTHORIZED).send("Error: expired token");
  }
  next();
}
