import connection from "../database/database.js";

const searchUser= async (req,res)=>{
    //ver se nao tem searchUser
    const {search} = req.query;
    if(!search){
        return res.sendStatus(409);
    }
    try{
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1 LIMIT 5`,[`%${search}%`])).rows;
        return res.send(response);
    }catch(err){
        return res.status(500).send(err.message);
    }
};

// const searchUserId

export {searchUser}