import express from "express";
import { signin, signup, logout, getUserInfo } from "../controllers/usersController.js";
import { signupValidations } from "../middlewares/usersMiddlewares.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { newUserSchema, newLoginSchema } from "../schemas/userSchema.js";


const userRoute = express.Router();

userRoute.post("/sign-up", signupValidations,validateSchema(newUserSchema),signup);
userRoute.post("/",validateSchema(newLoginSchema),signin);
userRoute.post("/logout",validateToken,logout);
userRoute.get("/userinfo",validateToken,getUserInfo)

export default userRoute;
