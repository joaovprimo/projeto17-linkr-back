import connection from "../database/database.js";

const searchUser= async (req,res)=>{
    const {search} = req.query;
    if(!search){
        return res.sendStatus(404);
    };
    try{
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1 LIMIT 5`,[`%${search}%`])).rows;
        return res.send(response);
    }catch(err){
        return res.status(500).send(err.message);
    };
};

const searchUserId = async(req,res)=>{
    const {id}=req.params;
    if(!id){
        res.sendStatus(404);
    };
    try{
        const posts = (await connection.query(`
        SELECT posts.description,users.email,posts.id, posts.url, users.id AS "userId",
        users."pictureUrl" AS "image" , users.username AS name
        FROM posts  
        JOIN users ON users.id= posts."userId"
        WHERE "userId"=$1
        `,[id])).rows
        for (let i = 0; i < posts.length; i++) {
            const urlInfo = await connection.query(
              'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
              [posts[i].url]
            );
            posts[i].urlInfo = urlInfo.rows[0];
          };
          
        return res.send(posts);
    }catch(err){
        return res.status(500).send(err);
    };
};

const getNameById=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.sendStatus(404);
    };
    try{
        const name = (await connection.query(`SELECT * FROM users WHERE id=$1`,[id])).rows;
        if(!name[0]){
            return res.sendStatus(404);
        };
        return res.send(name);
    }catch(err){
        return res.status(500).send(err);
    };
};


export {searchUser,searchUserId,getNameById}