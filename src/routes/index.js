import express from "express";
import userRoute from "./usersRoute.js";
import timelineRoute from "./timelineRoute.js";
import deleteRoute from "./deleteRouter.js";
import likesRoute from "./likesRoute.js";
import editRoute from "./editRouter.js";

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(timelineRoute);
Routes.use(deleteRoute);
Routes.use(likesRoute);
Routes.use(editRoute);
export default Routes;
