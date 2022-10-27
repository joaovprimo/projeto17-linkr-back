import connection from "../database/database.js";

async function getPostByDescription(description){
    return await connection.query('SELECT * FROM posts WHERE description=$1',[description])
}

export {getPostByDescription}