import express from "express";
import userRoute from "./usersRoute.js";
import postRoute from "./postRoute.js";

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(postRoute);
export default Routes;
