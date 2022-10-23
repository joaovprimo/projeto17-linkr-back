import express from "express";
import { getPostHashtags } from "../controllers/trendController.js";

const trendRouter = express.Router();

trendRouter.get("/hashtag/:hashtag", getPostHashtags);

export default trendRouter;
