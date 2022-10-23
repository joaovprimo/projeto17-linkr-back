import connection from "../database/database.js";

export async function getTrendbyName(name) {
  return connection.query(`SELECT * FROM trends WHERE name=$1`, [name]);
}

export async function getLastPost() {
  return connection.query(`SELECT * FROM posts ORDER BY ID DESC LIMIT 1`);
}

export async function insertNewTrend(name) {
  return connection.query(
    `INSERT INTO trends (name, visitcount) VALUES ($1, $2)`,
    [name, 0]
  );
}

export async function updateTrend(trendId) {
  return connection.query(
    `UPDATE trends SET visitcount=visitcount+1 WHERE id=$1`,
    [trendId]
  );
}

export async function insertPostTrends(postId, trendId) {
  return connection.query(
    `INSERT INTO "postsTrends" ("postsId", "trendsId") VALUES ($1, $2)`,
    [postId, trendId]
  );
}
