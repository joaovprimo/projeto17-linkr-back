import express from "express";

import {likesPost, getLikes, getUser} from "../controllers/likesController.js";

const likesRoute = express.Router();

likesRoute.get(`/posts/likes/:id`, getLikes)
likesRoute.post(`/posts/likes/:id/:idusr`,likesPost)
likesRoute.get(`/user/:id`, getUser)


export default likesRoute;