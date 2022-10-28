import connection from "../database/database.js"

async function searchUsersRepository (search){
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1`,[`%${search}%`])).rows;
        return response;
}

async function getNameByIdRepository (id){
        return (await connection.query(`SELECT * FROM users WHERE id=$1`,[id])).rows;
}

export {searchUsersRepository,getNameByIdRepository};