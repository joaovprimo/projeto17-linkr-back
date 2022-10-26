import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { deletePostFunction} from "../controllers/deleteController.js";

const deleteRoute = express.Router();

deleteRoute.delete(`/posts/:id`, validateToken ,deletePostFunction)

export default deleteRoute;