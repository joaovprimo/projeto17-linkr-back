import urlMetadata from "url-metadata";
import connection from "../database/database.js";
import { getUserFollows } from "../repositories/followRepository.js";
import * as trendRepository from "../repositories/trendsRepository.js";
import { StatusCodes } from "http-status-codes";
import { fetchOriginalPost, getRepostsCountById, insertRepost } from "../repositories/repostRepository.js";

const postLink = async (req, res) => {
  const body = res.locals.body;
  try {
    await connection.query(
      'INSERT INTO posts(url, description, "userId", "reposterId") VALUES ($1,$2,$3,$4)',
      [body.url, body.description, body.userId, body.reposterId]
    );
    const { canonical, image, title, description } = await urlMetadata(
      body.url
    );
    const { rows: postId } = await trendRepository.getLastPost();
    const splitter = body.description.split("#");
    for (let i = 1; i <= splitter.length - 1; i++) {
      let trend = splitter[splitter.length - i];
      trend = trend.replace(/\s/g, "");
      const pId = postId[0].id;
      const { rows: check } = await trendRepository.getTrendbyName(trend);
      if (check.length === 0) {
        await trendRepository.insertNewTrend(trend);
      } else {
        await trendRepository.updateTrend(check[0].id);
      }
      const { rows: trendId } = await trendRepository.getTrendbyName(trend);
      await trendRepository.insertPostTrends(pId, trendId[0].id);
    }
    await connection.query(
      'INSERT INTO "urlInfo" (url, canonical, image, title, description) VALUES ($1,$2,$3,$4,$5)',
      [body.url, canonical, image, title, description]
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "23505":
        return res.sendStatus(201);
      case "ENOTFOUND":
        return res.status(422).send("Link enviado está quebrado");
    }
    return res.status(500).send(error);
  }
};

const getTimeline = async (req, res) => {
  const {id} = res.locals.user;
  try {
    const allPosts = await connection.query(
      `SELECT posts.*, users.username AS name, users.email, users."pictureUrl" AS image
      FROM posts 
      JOIN followers ON posts."userId" = followers."followedId"
      JOIN users ON posts."userId" = users.id
      WHERE followers."followerId"=$1
      ORDER BY posts.id DESC 
      LIMIT 20;`
    ,[id]);

    for (let i = 0; i < allPosts.rows.length; i++) {
      const urlInfo = await connection.query(
        'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
        [allPosts.rows[i].url]
      );
      allPosts.rows[i].urlInfo = urlInfo.rows[0];
    }
    const follows = await getUserFollows(id);
    if(follows.length===0 && allPosts.rows.length===0){
      return res.status(StatusCodes.OK).send('no follows');
    }
    if(allPosts.rows.length===0){
      return res.status(StatusCodes.OK).send('no posts');
    }
    return res.status(StatusCodes.OK).send(allPosts.rows);
  } catch (error) {
    console.log(error.message)
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

};

const getRepostsById = async (req,res) => {
const {id} = req.params;

const reposts = await getRepostsCountById(id);
if(!reposts) return res.status(404).send({message:"Não existem reposts", res: 0})

return res.send(reposts)

}

const postRepost = async (req,res) => {
  const {idPost, reposterId} = req.body;

  try{
    const originalPost = await fetchOriginalPost(idPost);
    if(!originalPost) return res.status(StatusCodes.BAD_REQUEST).send("Post original inexistente")
    if(originalPost.originPostId) {
      originalPost.originId = originalPost.originPostId;
    }
    delete originalPost.originPostId;

    originalPost.reposterId = reposterId;
    insertRepost(originalPost);
    return res.sendStatus(StatusCodes.OK)
  }catch(error){
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

}

export { getTimeline, postLink, getRepostsById,postRepost };
