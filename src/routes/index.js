import express from "express";

import postRoute from "./postRoute.js";

const Routes = express.Router();
Routes.use(postRoute);
export default Routes;
