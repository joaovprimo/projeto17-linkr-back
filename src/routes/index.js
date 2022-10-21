import express from "express";
import userRoute from "./usersRoute.js";
import timelineRoute from "./timelineRoute.js";
import { searchRoute } from "./searchRouter.js";

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(timelineRoute);
Routes.use(searchRoute);

export default Routes;
