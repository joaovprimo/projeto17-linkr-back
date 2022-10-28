import { StatusCodes } from "http-status-codes";
import { deleteTrendsByDescription, deletPostTrendsByPostId } from "../repositories/deleteRepository.js";
import { getPostById, updatePost } from "../repositories/editRepository.js";
import { getPostByTrend } from "../repositories/postRepository.js";
import { getTrendbyName, insertNewTrend, insertPostTrends } from "../repositories/trendsRepository.js";

export async function editPost(req, res) {
    const user = res.locals.user;
    const { id } = req.params;
    const { description } = req.body;

    try {
        const postUser = (await getPostById(id)).rows[0];
        if (user.id !== postUser.userId) {
            return res.status(StatusCodes.UNAUTHORIZED)
            .send("Action not allowed, the user does not match with the post's owner");
        }

        await deletPostTrendsByPostId(id);
        const OldTrendsArray = postUser.description.split('#');
        for (let i = 1; i <= OldTrendsArray.length - 1; i++) {
            const trends = await getPostByTrend('#' + OldTrendsArray[i].trim());
            if (trends.rowCount === 1) {
                await deleteTrendsByDescription(OldTrendsArray[i].trim());
            }
        }

        const NewTrendsArray = description.split('#');
        for (let i = 1; i <= NewTrendsArray.length - 1; i++) {
            let trends = await getTrendbyName(NewTrendsArray[i].trim())
            if (trends.rowCount === 0) {
                await insertNewTrend(NewTrendsArray[i].trim());
                trends = (await getTrendbyName(NewTrendsArray[i].trim())).rows[0];
            }
            await insertPostTrends(id, trends.id)
        }

        await updatePost(description, id, user.id);
        const postEdited = await getPostById(id);
        return res.status(StatusCodes.OK).send(postEdited.rows[0].description)
    } catch (err) {
        console.log(err.message)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
}