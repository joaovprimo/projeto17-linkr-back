import { getPostById, updatePost} from "../repositories/editRepository.js";
export async function editPost (req, res){
    const user = res.locals.user;
    const {id} = req.params;
    const {description} = req.body;
    try{
        const post= await getPostById(id);
        const postUser = post.rows[0];
        if(user.id !== postUser.userId){
            return res.status(401).send("Action not allowed, the user does not match with the post's owner");
        }
        const update = await updatePost(description,id,user.id);
        const postEdited = await getPostById(id);
        return res.status(200).send(postEdited.rows[0].description)

    }catch(err){
        return res.status(500).send(err.message);
    }

}