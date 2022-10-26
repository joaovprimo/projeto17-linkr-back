import connection from "../database/database.js";

async function getPostById (id){
const post = await connection.query(`
SELECT * FROM posts WHERE id = $1;
`, [id]);
return post;
}

async function updatePost(description,id,user){
    const updt =await connection.query(`
    UPDATE posts SET description=$1 WHERE id = $2 AND "userId" = $3;
    `,[description,id,user]);
    return updt;
}

export {getPostById, updatePost}