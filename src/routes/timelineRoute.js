import express from "express";
import { getTimeline, postLink } from "../controllers/timelineController.js";

const timelineRoute = express.Router();

timelineRoute.get("/posts", getTimeline);
timelineRoute.post("/posts", postLink);

export default timelineRoute;
