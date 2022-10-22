import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import Routes from "./routes/index.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use(Routes);

// app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT}`));
app.listen(4000, console.log(`listening on 4000`));