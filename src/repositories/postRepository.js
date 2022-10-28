import connection from "../database/database.js";

async function getPostByTrend(trend){
    return await connection.query('SELECT * FROM posts WHERE description LIKE $1'
    ,[`%${trend}%`])
}

async function updatePostTrendsFindByPostIdUpdateByTrendId(postsId,trendsId){
    return await connection.query('UPDATE "postsTrends" WHERE "postsId"=$1 AND "trendsId"=$2'
    ,[postsId,trendsId])
  }

export {getPostByTrend, updatePostTrendsFindByPostIdUpdateByTrendId}