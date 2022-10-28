import { response } from "express";
import connection from "../database/database.js";

export async function postComment(req, res) {
  const { id } = res.locals.user;
  try {
    await connection.query(
      `INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3)`,
      [id, req.body.postId, req.body.comment]
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getComments(req, res) {
  try {
    const { id } = req.params;
    const { rows: comments } = await connection.query(
      `SELECT comments.*, users.username, users."pictureUrl"
FROM comments
JOIN users ON comments."userId" = users.id
WHERE "postId" = $1`,
      [id]
    );
    return res.send(comments);
  } catch {
    return res.sendStatus(500);
  }
}
