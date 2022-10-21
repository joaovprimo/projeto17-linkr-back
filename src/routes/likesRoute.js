import express from "express";

import { validateToken } from "../middlewares/validateToken.js"
import {likesPost, getLikes} from "../controllers/likesController.js";

const likesRoute = express.Router();

likesRoute.get(`/posts/likes/:id`, getLikes)
likesRoute.post(`/posts/likes/:id`, validateToken ,likesPost)

export default likesRoute;