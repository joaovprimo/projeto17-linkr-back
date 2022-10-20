import express from "express";
import { getTimeline, postLink } from "../controllers/timelineController.js";
import beforePostMiddleware from "../middlewares/beforePostMiddleware.js";

const timelineRoute = express.Router();

timelineRoute.get("/posts", getTimeline);
timelineRoute.post("/posts", beforePostMiddleware, postLink);

export default timelineRoute;
