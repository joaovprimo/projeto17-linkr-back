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

export { insertIntoPosts, insertIntoUrlInfo}