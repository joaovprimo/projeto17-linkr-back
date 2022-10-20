import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import {
  insertSignup,
  getUserInfo,
  insertSession,
  invalidateTokenSession,
} from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";

async function signup(req, res) {
  let { email, password, username, pictureUrl } = req.body;
  password = bcrypt.hashSync(password, 12);
  try {
    await insertSignup({ email, password, username, pictureUrl });
    return res.sendStatus(StatusCodes.CREATED);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function signin(req, res) {
  const { email, password } = req.body;
  let authentication = false;
  try {
    const user = await getUserInfo({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Error: email not registred");
    }
    authentication = bcrypt.compareSync(password, user.password);
    if (!authentication) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send("Error: incorret password");
    }
    const userid = user.id;
    const token = jwt.sign({ id: userid }, process.env.TOKEN_SECRET, {
      expiresIn: "10d",
    });
    await insertSession({ token, userid });
    return res.status(StatusCodes.OK).send({ token: token });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function logout(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  await invalidateTokenSession({ token });
  return res.sendStatus(StatusCodes.OK);
}

export { signup, signin, logout };
