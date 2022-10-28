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

async function deletPostTrendsByPostId(id){
  return await connection.query('DELETE FROM "postsTrends" WHERE "postsId"=$1',[id])
}

async function deleteTrendsByDescription(description){
    return await connection.query('DELETE FROM "trends" WHERE name=$1',[description]);
}

export {deleteLikesPost, deletPost, deletPostTrendsByPostId, deleteTrendsByDescription}