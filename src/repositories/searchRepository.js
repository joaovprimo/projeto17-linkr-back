import connection from "../database/database.js"

async function searchUsersRepository (lim, search){
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1 ${lim}`,[`%${search}%`])).rows;
        return response
}

export {searchUsersRepository};