import connection from "../database/database.js";

async function insertSignup({ email, username, password, pictureUrl }) {
    return connection.query(
        'INSERT INTO users (email,username,password,"pictureUrl") VALUES ($1,$2,$3,$4)',
        [email, username, password, pictureUrl]
    );
}

async function getUserInfo({ email }) {
    return (await connection.query('SELECT * FROM users WHERE email=$1;',
        [email])).rows[0];
}

export { insertSignup, getUserInfo }