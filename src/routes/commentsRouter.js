import express from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import commentSchema from "../schemas/commentsSchema.js";
import { getComments, postComment } from "../controllers/commentsController.js";

const commentsRoute = express.Router();

commentsRoute.post(
  "/comments",
  validateToken,
  validateSchema(commentSchema),
  postComment
);

commentsRoute.get("/comments/:id", getComments);

export default commentsRoute;
