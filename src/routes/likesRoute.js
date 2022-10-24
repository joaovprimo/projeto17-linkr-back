import express from "express";

import {likesPost, getLikes, getUser} from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validateToken.js";

const likesRoute = express.Router();

likesRoute.get(`/posts/likes/:id`, validateToken,getLikes)
likesRoute.post(`/posts/likes/:id/:idusr`,validateToken,likesPost)
likesRoute.get(`/user/:id`, getUser)


export default likesRoute;