import { getPostById } from "../repositories/editRepository.js";
import {deleteLikesPost, deleteTrendsByDescription, deletPost, deletPostTrendsByPostId} from "../repositories/deleteRepository.js";
import { getPostByDescription } from "../repositories/postRepository.js";

export async function deletePostFunction (req, res){
    const user = res.locals.user;
    const {id} = req.params;
    
    try{
        const checkPost = await getPostById(id);
        if(checkPost.rowCount === 0){
            return res.status(404).send(`There is not a post with id ${id}`)
        }
        const postDescription = checkPost.rows[0].description;
        const userPostId = checkPost.rows[0].userId;
        if(user.id !== userPostId){
            return res.status(401).send("Action not allowed, the user does not match with the post's owner");
        }
        await deletPostTrendsByPostId(id);
        const trends = await getPostByDescription(postDescription);
        if(trends.rowCount===1){
            const trend = postDescription.replace('#','');
            await deleteTrendsByDescription(trend);
        }
        await deleteLikesPost(id);
        await deletPost(id);

        return res.status(204).send("Deleted");

    }catch(err){
        console.log(err.message)
        return res.status(500).send(err.message)
    }
}