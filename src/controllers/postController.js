import connection from "../database/database.js";

const post = async (req, res) => {
  const teste = await connection.query("SELECT * FROM users;");
  res.send(teste.rows);
};

export { post };
