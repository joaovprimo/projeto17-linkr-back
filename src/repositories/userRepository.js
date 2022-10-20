import connection from "../database/database.js";

export async function insertSignup({email,username,password,pictureUrl}){
    return connection.query('INSERT INTO users (email,username,password,pictureUrl) VALUES ($1,$2,$3,$4)',
                            [email,username,password,pictureUrl]);
}