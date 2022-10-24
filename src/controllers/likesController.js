import connection from "../database/database.js";

export async function likesPost (req, res){
    const {idusr} = req.params;
    const {id} = req.params;
    const user = res.locals.user;

    try{
        const likeUser = await connection.query(`
        SELECT * FROM likes WHERE "postId" = $1 AND "userId"=$2; 
        `, [id, idusr]);
        console.log(likeUser.rows)

        if(likeUser.rowCount === 0){
            const postLike =  await connection.query(`
            INSERT INTO likes ("postId","userId") VALUES ($1,$2);
            `,[id, idusr]);
            const likesPost = await connection.query(`
            SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId" = $1
        `, [id]);

            return res.status(200).send({
                likesarray:likesPost.rows,
                likeslength:likesPost.rowCount
            });
        }else{
            const deteLike =  await connection.query(`
            DELETE FROM likes WHERE "postId" = $1 AND "userId"=$2;
            `,[id, idusr]);

            const likesPost = await connection.query(`
            SELECT users.username FROM likes JOIN users ON likes."userId"=users.id WHERE likes."postId" = $1
            `, [id]);
        return res.send({
            likesarray:likesPost.rows,
            likeslength:likesPost.rowCount});
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
        return res.send({
            likesarray:likes.rows,
            likeslength:likes.rowCount});
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function  getUser( req, res){
    const {id} = req.params;
  
    try{
        const userFind = await connection.query(`
        SELECT * FROM users WHERE id =$1;
        `,[id]);

        if(userFind.rowCount===0){
            return res.sendStatus(404);
        }
        return res.status(200).send(userFind.rows[0]);
    }catch(err){
        return res.status(500).send(err.message);
    }
}