import connection from "../database/database.js";

async function insertSignup({ email, username, password, pictureUrl }) {
    return connection.query(
        'INSERT INTO users (email,username,password,"pictureUrl") VALUES ($1,$2,$3,$4)',
        [email, username, password, pictureUrl]
    );
}

async function getUserInfoByEmail({ email }) {
    return (await connection.query('SELECT * FROM users WHERE email=$1;',
        [email])).rows[0];
}

async function insertSession({token,userid}){
    return connection.query('INSERT INTO sessions ("userId",token) VALUES ($1,$2)',
                            [userid,token]);
}

async function invalidateTokenSession({token}){
    return connection.query('UPDATE sessions SET "isValid" = FALSE WHERE token=$1',
                            [token])
}

async function searchSessionForToken({token}){
    return (await connection.query('SELECT * FROM sessions WHERE token=$1',
    [token])).rows[0];
}

async function getUserInfoById(id){
    return (await connection.query('SELECT id,username,email,"pictureUrl" FROM users WHERE id=$1',
    [id])).rows[0];
}

export { insertSignup, getUserInfoByEmail, insertSession, invalidateTokenSession, searchSessionForToken, getUserInfoById }