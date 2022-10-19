import connection from "../database.js";
import urlMetadata from "url-metadata";

const postLink = (req, res) => {
  const a = req.body;
  console.log(a);
  return res.send(a);
};

const getTimeline = async (req, res) => {
  const allPosts = await connection.query("SELECT * FROM posts LIMIT 20;");

  for (let i = 0; i < allPosts.rows.length; i++) {
    const { canonical, image, title, description } = await urlMetadata(
      allPosts.rows[i].url
    );
    let urlInfo = {
      canonical,
      image,
      title,
      description,
    };
    allPosts.rows[i].urlInfo = urlInfo;
  }

  return res.send(allPosts.rows);
};

export { getTimeline, postLink };
