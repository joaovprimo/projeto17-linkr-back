import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import Routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
app.use(cors());
app.use(express.json());

app.use(Routes);

app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT}`));
