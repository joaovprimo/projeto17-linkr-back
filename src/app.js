import express from "express";
import dotenv from "dotenv";

import Routes from "./routes/index.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(Routes);

app.listen(process.env.PORT, console.log(`listening on ${process.env.PORT}`));
