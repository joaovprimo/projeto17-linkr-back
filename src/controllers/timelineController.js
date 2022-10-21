import urlMetadata from "url-metadata";
import connection from "../database/database.js";

const postLink = async (req, res) => {
  const body = res.locals.body;
  try {
    await connection.query(
      'INSERT INTO posts(url, description, "userId") VALUES ($1,$2,$3)',
      [body.url, body.description, body.userId]
    );
    const { canonical, image, title, description } = await urlMetadata(
      body.url
    );
    await connection.query(
      'INSERT INTO "urlInfo" (url, canonical, image, title, description) VALUES ($1,$2,$3,$4,$5)',
      [body.url, canonical, image, title, description]
    );

    return res.sendStatus(201);
  } catch (error) {
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
  const allPosts = await connection.query(
    'SELECT posts.*, users.username AS name, users.email, users."pictureUrl" AS image FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts.id DESC LIMIT 20 ;'
  );

  for (let i = 0; i < allPosts.rows.length; i++) {
    const urlInfo = await connection.query(
      'SELECT canonical,image,title,description FROM "urlInfo" WHERE url = $1',
      [allPosts.rows[i].url]
    );
    allPosts.rows[i].urlInfo = urlInfo.rows[0];
  }

  return res.send(allPosts.rows);
};

export { getTimeline, postLink };