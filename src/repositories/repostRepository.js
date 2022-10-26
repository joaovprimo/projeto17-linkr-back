import connection from "../database/database.js";

async function fetchOriginalPost(idPost){
    const originalPost = await connection.query('SELECT url, description, "userId", "originPostId", id AS "originId" FROM posts WHERE id = $1;',[idPost])
    return originalPost.rows[0]
}

export {fetchOriginalPost}