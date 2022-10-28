import { response } from "express";
import connection from "../database/database.js";
import {
  getCommentsById,
  insertComment,
} from "../repositories/commentsRepository.js";

export async function postComment(req, res) {
  const { id } = res.locals.user;
  console.log(id);
  try {
    await insertComment(id, req.body.postId, req.body.comment);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  try {
    const { id } = req.params;
    const { rows: comments } = await getCommentsById(id);
    return res.send(comments);
  } catch {
    return res.sendStatus(500);
  }
}
