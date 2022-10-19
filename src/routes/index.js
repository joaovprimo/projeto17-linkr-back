import express from "express";
import timelineRoute from "./timelineRoute.js";

const Routes = express.Router();
Routes.use(timelineRoute);
export default Routes;
