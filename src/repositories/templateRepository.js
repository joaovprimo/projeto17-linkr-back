import { connection } from "../database/db.js";

export async function getUserInfo(id) {
  return connection.query(`WRITE THE QUERY HERE`, [id]);
}
