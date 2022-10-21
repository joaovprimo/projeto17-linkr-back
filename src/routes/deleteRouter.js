import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {deletePost} from "../controllers/deleteController.js";

const deleteRoute = express.Router();

deleteRoute.delete(`/posts/:id`, validateToken ,deletePost)

export default deleteRoute;