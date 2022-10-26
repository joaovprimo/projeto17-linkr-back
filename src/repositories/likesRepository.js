import connection from "../database/database.js";

async function likeUser (id, idusr){
    const likeUsr = await connection.query(`
        SELECT * FROM likes WHERE "postId" = $1 AND "userId"=$2; 
        `, [id, idusr]);
        return likeUsr;
}

async function postLike (id, idusr){
   const liking = await connection.query(`
    INSERT INTO likes ("postId","userId") VALUES ($1,$2);
    `,[id, idusr]);
    return liking;
}

async function likesPost (id){
   const like = await connection.query(`
    SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId" = $1
`, [id]);
return like;
}

async function deleteLike(id, idusr){
   const deleting = await connection.query(`
    DELETE FROM likes WHERE "postId" = $1 AND "userId"=$2;
    `,[id, idusr]);
    return deleting
}

async function getLike(id){
const getLk = await connection.query(`
SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId" = $1
`, [id]);
return getLk;
}

async function userFind(id){
const usr = await connection.query(`
    SELECT * FROM users WHERE id =$1;
    `,[id]);
return usr;
}

export {likeUser, postLike, likesPost, deleteLike, getLike, userFind}