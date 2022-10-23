import express from "express";
import {
  getPostHashtags,
  getTrendRanking,
} from "../controllers/trendController.js";

const trendRouter = express.Router();

trendRouter.get("/hashtag/:hashtag", getPostHashtags);
trendRouter.get("/ranking", getTrendRanking);

export default trendRouter;
