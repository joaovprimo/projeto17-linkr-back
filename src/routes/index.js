import express from "express";
import userRoute from "./usersRoute.js";
import timelineRoute from "./timelineRoute.js";

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(timelineRoute);
export default Routes;
