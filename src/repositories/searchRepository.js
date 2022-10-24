import connection from "../database/database.js"

async function searchUsersRepository (lim, search){
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1 ${lim}`,[`%${search}%`])).rows;
        return response;
}

async function getNameByIdRepository (id){
        return (await connection.query(`SELECT * FROM users WHERE id=$1`,[id])).rows;
}

export {searchUsersRepository,getNameByIdRepository};