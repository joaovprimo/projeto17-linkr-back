import connection from "../database/database.js";

async function insertIntoPosts(body){
    await connection.query(
        'INSERT INTO posts(url, description, "userId", "reposterId") VALUES ($1,$2,$3,$4)',
        [body.url, body.description, body.userId, body.reposterId]
      );
}

async function insertIntoUrlInfo(body,canonical, image, title, description){
    await connection.query(
        'INSERT INTO "urlInfo" (url, canonical, image, title, description) VALUES ($1,$2,$3,$4,$5)',
        [body.url, canonical, image, title, description]
      );
}

async function getTimelineByConnections(id){
    const allPosts = connection.query(
        `SELECT posts.*, users.username AS name, users.email, users."pictureUrl" AS image
        FROM posts 
        JOIN followers ON posts."userId" = followers."followedId"
        JOIN users ON posts."userId" = users.id
        WHERE followers."followerId"=$1
        ORDER BY posts.id DESC 
        LIMIT 20;`
      ,[id]);
      return allPosts;
}

async function selectUrlByUrl(url){
    const urlInfo = await connection.query(
        'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
        [url]
      );
      return urlInfo
}

export { insertIntoPosts, insertIntoUrlInfo, getTimelineByConnections, selectUrlByUrl}