import * as trendRepository from "../repositories/trendsRepository.js";
import connection from "../database/database.js";

export async function getPostHashtags(req, res) {
  try {
    const { hashtag } = req.params;

    const { rows: trend } = await trendRepository.getTrendbyName(hashtag);

    if (trend.length === 0) {
      return res.sendStatus(404);
    }
    const { rows: trendPosts } = await trendRepository.getTrendPosts(
      trend[0].id
    );
    for (let i = 0; i < trendPosts.length; i++) {
      const { rows: urlInfo } = await trendRepository.getUrlInfo(
        trendPosts[i].url
      );
      trendPosts[i].urlInfo = urlInfo[0];
    }
    return res.send(trendPosts);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function getTrendRanking(req, res) {
  try {
    const { rows: ranking } = await trendRepository.getTrendByRanking();
    return res.send(ranking);
  } catch {
    return res.sendStatus(500);
  }
}
