import { likeUser, postLike, liksPost, deleteLike, getLike, userFind } from "../repositories/likesRepository.js";

export async function likesPostFunction (req, res){
    const {idusr} = req.params;
    const {id} = req.params;

    try{
        const likeUsr = await likeUser(id, idusr);

        if(likeUsr.rowCount === 0){
            const like =  await postLike(id, idusr);
            const likesPosted = await liksPost(id);

            return res.status(200).send({
                likesarray:likesPosted.rows,
                likeslength:likesPosted.rowCount
            });
        }else{
            const deteLike =  await deleteLike(id, idusr);

            const likesPosted = await liksPost(id);
        return res.send({
            likesarray:likesPosted.rows,
            likeslength:likesPosted.rowCount});
        }
      
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function getLikes (req, res){
    const {id} = req.params;
   
    try{
        const likes = await getLike(id);
        if(likes.rowCount === 0){
            return res.send("0");
        }
        return res.send({
            likesarray:likes.rows,
            likeslength:likes.rowCount});
    }catch(err){
        return res.status(500).send(err.message);
    }
}

export async function  getUser( req, res){
    const {id} = req.params;
  
    try{
        const usrFind = await userFind(id)

        if(usrFind.rowCount===0){
            return res.sendStatus(404);
        }
        return res.status(200).send(usrFind.rows[0]);
    }catch(err){
        return res.status(500).send(err.message);
    }
}