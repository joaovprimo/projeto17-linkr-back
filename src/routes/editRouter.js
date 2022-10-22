import express from "express";

import { validateToken } from "../middlewares/validateToken.js"
import { editPost } from "../controllers/editController.js"; 

const editRoute = express.Router();

editRoute.post(`/posts/edit/:id`, validateToken ,editPost)

export default editRoute;