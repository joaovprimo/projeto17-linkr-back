import express from "express";
import { getTimeline, postLink } from "../controllers/timelineController.js";
import beforePostMiddleware from "../middlewares/beforePostMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";

const timelineRoute = express.Router();


timelineRoute.get("/posts",validateToken, getTimeline);
timelineRoute.post("/posts", beforePostMiddleware, postLink);


export default timelineRoute;
