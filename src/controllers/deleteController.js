import connection from "../database/database.js";

export async function deletePost (req, res){
    const user = res.locals.user;
    const {id} = req.params;
    
    try{
        const checkPost = await connection.query(`
        SELECT * FROM posts WHERE id = $1;
        `,[id]);
       

        if(checkPost.rowCount === 0){
            return res.status(404).send(`There is not a post with id ${id}`)
        }

        const userPostId = checkPost.rows[0].userId;

        if(user.id !== userPostId){
            return res.status(401).send("Action not allowed, the user does not match with the post's owner");
        }
        
        await connection.query(`
        DELETE FROM likes WHERE "postId" = $1;
        `, [id]);
        /*await connection.query(`
        DELETE FROM postsTrends WHERE "postId" = $1;
        `, [id]);*/
        await connection.query(`
        DELETE FROM posts WHERE id = $1;
        `, [id]);

        return res.status(204).send("Deleted");

    }catch(err){
        console.log(err.message)
        return res.status(500).send(err.message)
    }
}