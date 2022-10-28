import connection from "../database/database.js";

export async function insertComment(id, postId, comment) {
  connection.query(
    `INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3)`,
    [id, postId, comment]
  );
}

export async function getCommentsById(id) {
  const comments = await connection.query(
    `SELECT comments.*, users.username, users."pictureUrl"
FROM comments
JOIN users ON comments."userId" = users.id
WHERE "postId" = $1`,
    [id]
  );
  return comments;
}
