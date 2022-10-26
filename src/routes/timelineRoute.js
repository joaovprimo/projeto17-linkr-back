import express from "express";
import { getRepostsById, getTimeline, postLink, postRepost } from "../controllers/timelineController.js";
import beforePostMiddleware from "../middlewares/beforePostMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";

const timelineRoute = express.Router();


timelineRoute.get("/posts",validateToken, getTimeline);
timelineRoute.post("/posts", beforePostMiddleware, postLink);
timelineRoute.get("/reposts/:id", getRepostsById)
timelineRoute.post("/reposts", postRepost)


export default timelineRoute;
