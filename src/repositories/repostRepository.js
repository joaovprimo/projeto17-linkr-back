import connection from "../database/database.js";

async function fetchOriginalPost(idPost){
    const originalPost = await connection.query('SELECT url, description, "userId", "originPostId", id AS "originId" FROM posts WHERE id = $1;',[idPost])
    return originalPost.rows[0]
}
async function insertRepost(originalPost){
    await connection.query('INSERT INTO posts (url, "userId",description, "reposterId","originPostId") VALUES ($1,$2,$3,$4,$5)',[originalPost.url,originalPost.userId,originalPost.description,originalPost.reposterId,originalPost.originId]);

}

export {fetchOriginalPost, insertRepost}