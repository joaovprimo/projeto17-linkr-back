import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

/*const connection = new Pool({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: '88974778',
    database: 'linkr'

});*/
export default connection;
