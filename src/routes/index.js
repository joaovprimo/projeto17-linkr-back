import express from "express";
import userRoute from "./usersRoute.js";
import timelineRoute from "./timelineRoute.js";
import { searchRoute } from "./searchRouter.js";
import deleteRoute from "./deleteRouter.js";
import likesRoute from "./likesRoute.js";
import editRoute from "./editRouter.js";
import trendRouter from "./trendRouter.js";
import followRoute from "./followRouter.js";
import commentsRoute from "./commentsRouter.js";

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(timelineRoute);
Routes.use(searchRoute);
Routes.use(trendRouter);
Routes.use(followRoute);
Routes.use(deleteRoute);
Routes.use(likesRoute);
Routes.use(editRoute);
Routes.use(commentsRoute);

export default Routes;
