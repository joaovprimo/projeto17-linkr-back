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
    [name, 1]
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

export async function getTrendPosts(id) {
  return connection.query(
    `SELECT posts.*, users.username AS name, users.email, users."pictureUrl" AS image, trends.name AS hashtag
        FROM posts JOIN users ON posts."userId" = users.id 
        JOIN "postsTrends" ON posts.id="postsTrends"."postsId" 
        JOIN trends ON "postsTrends"."trendsId"=trends.id
        WHERE "postsTrends"."trendsId" = $1`,
    [id]
  );
}

export async function getUrlInfo(url) {
  return connection.query(
    'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
    [url]
  );
}
