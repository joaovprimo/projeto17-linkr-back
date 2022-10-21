import connection from "../database/database.js";

export async function likesPost (req, res){
    const user = res.locals.user;
    const {id} = req.params;

    try{
        const likeUser = await connection.query(`
        SELECT * FROM likes WHERE "postId" = $1 AND "userId"=$2; 
        `, [id, user.id]);

        if(likeUser.rowCount === 0){
            const postLike =  await connection.query(`
            INSERT INTO likes ("postId","userId") VALUES ($1,$2);
            `,[id, user.id]);
            return res.sendStatus(200);
        }else{
            const deteLike =  await connection.query(`
            DELETE FROM likes WHERE "postId" = $1 AND "userId"=$2;
            `,[id, user.id]);
            return res.sendStatus(204);
        }
      
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getLikes (req, res){
    const {id} = req.params;

    try{
        const likes = await connection.query(`
        SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId" = $1
        `, [id]);
        if(likes.rowCount === 0){
            return res.send("0");
        }
        return res.send(likes.rows);
    }catch(err){
        return res.status(500).send(err.message);
    }
}