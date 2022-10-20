import express from "express";
import { signin, signup } from "../controllers/usersController.js";
import { signupValidations, newUserSchema, newLoginSchema } from "../middlewares/usersMiddlewares.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const userRoute = express.Router();

userRoute.post("/sign-up", signupValidations,validateSchema(newUserSchema),signup);
userRoute.post("/",validateSchema(newLoginSchema),signin);

export default userRoute;
