import express from "express";
import { getLikes, getUser, likesPostFunction} from "../controllers/likesController.js";
import { validateToken } from "../middlewares/validateToken.js";

const likesRoute = express.Router();

likesRoute.get(`/posts/likes/:id`,getLikes)
likesRoute.post(`/posts/likes/:id/:idusr`,likesPostFunction)
likesRoute.get(`/user/:id`, getUser)


export default likesRoute;