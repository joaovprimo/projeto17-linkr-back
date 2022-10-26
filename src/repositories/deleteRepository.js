import connection from "../database/database.js";

async function deleteLikesPost(id){
  const dlt = await connection.query(`
        DELETE FROM likes WHERE "postId" = $1;
        `, [id]);
return dlt;
}

async function deletPost(id){
    const dlt = await connection.query(`
    DELETE FROM posts WHERE id = $1;
    `, [id]);
    return dlt;
}

export {deleteLikesPost, deletPost}