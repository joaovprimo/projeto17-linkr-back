import express from "express";
import { getTimeline } from "../controllers/timelineController.js";

const timelineRoute = express.Router();

timelineRoute.get("/posts", getTimeline);

export default timelineRoute;
