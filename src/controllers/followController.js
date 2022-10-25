import { StatusCodes } from "http-status-codes";
import connection from "../database/database.js";
import { 
    createFollowerById, deleteFollowerById, getFollowedById 
} from "../repositories/followRepository.js";

async function getIsFollowed(req,res) {
    const { id } = res.locals.user;
    const { userId } = req.params;
    try {
        const followed = await getFollowedById(id,userId)
        if (!followed) {
            return res.status(StatusCodes.OK).send(false);
        }
        if (followed) {
            return res.status(StatusCodes.OK).send(true);
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function postFollowUnfollow(req,res) {
    const { id } = res.locals.user;
    const { userId } = req.params;
    if(id===userId){
        return res.status(StatusCodes.BAD_REQUEST)
        .send('Error: user cant follow himself');
    }
    try {
        const followed = await getFollowedById(id,userId);
        if(followed){
            await deleteFollowerById(id,userId);
            return res.status(StatusCodes.OK).send('Unfollowed');
        }
        if(!followed){
            await createFollowerById(id,userId);
            return res.status(StatusCodes.OK).send('Followed');
        }

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export { getIsFollowed, postFollowUnfollow }
