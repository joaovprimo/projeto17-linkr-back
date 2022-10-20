import express from "express";
import { signup } from "../controllers/usersController.js";

const userRoute = express.Router();

userRoute.post("/sign-up", signup);

export default userRoute;
