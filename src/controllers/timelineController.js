import connection from "../database.js";
import urlMetadata from "url-metadata";

const postLink = async (req, res) => {
  const body = res.locals.body;
  try {
    await connection.query(
      'INSERT INTO posts(url, description, "userId") VALUES ($1,$2,$3)',
      [body.url, body.description, body.userId]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error);
  }
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
