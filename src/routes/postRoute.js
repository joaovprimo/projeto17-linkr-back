import express from "express";
import { post } from "../controllers/postController.js";

const postRoute = express.Router();

postRoute.get("/", post);

export default postRoute;
