import connection from "../database/database.js"

async function searchAllUsersRepository (search){
        const response = (await connection.query(`SELECT * FROM users WHERE username ILIKE $1`,[`%${search}%`])).rows;
        return response;
};
async function getNameByIdRepository (id){
        return (await connection.query(`SELECT * FROM users WHERE id=$1`,[id])).rows;
};
async function searchUserIdPostsRepository(id){
        return (await connection.query(`
        SELECT posts.*,
        users.email,
        users.username AS name,
        users."pictureUrl" AS "image" 
        FROM posts
        JOIN users ON users.id= posts."userId"
        WHERE "userId"=$1
        `,[id])).rows
};
async function searchUserIdUrlInfoRepository(posts,i){
        return (await connection.query(
                'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
                [posts[i].url]
              ));            
};
async function searchUsersFollowedRepository (id,search){
        return (await connection.query(`
        SELECT users.* , followers."followedId" FROM users 
        JOIN followers ON followers."followerId"=users.id
        WHERE followers."followerId"=$1 AND username ILIKE $2`
        ,[id,`%${search}%`])).rows;
        
};
export {searchAllUsersRepository,
        getNameByIdRepository,
        searchUserIdPostsRepository,
        searchUserIdUrlInfoRepository,
        searchUsersFollowedRepository};