import connection from "../database/database.js";

async function getFollowedById(id,userId){
    const followed = (await connection.query(
        'SELECT * FROM followers WHERE "followerId"=$1 AND "followedId"=$2', [id, userId])).rows[0];
    return followed;
}

async function deleteFollowerById(id,userId){
    const response = await connection.query(
        'DELETE FROM followers WHERE "followerId"=$1 AND "followedId"=$2',[id,userId]);
    return;
}

async function createFollowerById(id,userId){
    await connection.query(
        'INSERT INTO followers ("followerId","followedId") VALUES ($1,$2)',[id,userId]);
    return;
}

export {getFollowedById, deleteFollowerById, createFollowerById}
