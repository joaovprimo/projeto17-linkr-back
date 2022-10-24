import connection from "../database/database.js";

export async function editPost (req, res){
    const user = res.locals.user;
    const {id} = req.params;
    const {description} = req.body;
    console.log(description)
    try{
        const post= await connection.query(`
        SELECT * FROM posts WHERE id = $1;
        `, [id]);
        const postUser = post.rows[0];
        if(user.id !== postUser.userId){
            return res.status(401).send("Action not allowed, the user does not match with the post's owner");
        }
        await connection.query(`
        UPDATE posts SET description=$1 WHERE id = $2 AND "userId" = $3;
        `,[description,id,user.id]);
        const postEdited = await connection.query(`
        SELECT * FROM posts WHERE id = $1;
        `, [id]);
        return res.status(200).send(postEdited.rows[0].description)

    }catch(err){
        return res.status(500).send(err.message);
    }

}