import express from "express";
import userRoute from "./usersRoute.js";
import timelineRoute from "./timelineRoute.js";
<<<<<<< HEAD
import { searchRoute } from "./searchRouter.js";
=======
import deleteRoute from "./deleteRouter.js";
import likesRoute from "./likesRoute.js";
import editRoute from "./editRouter.js";
>>>>>>> 9dae61bc1164c01ced118acdfc2c7a7185cbe546

const Routes = express.Router();
Routes.use(userRoute);
Routes.use(timelineRoute);
<<<<<<< HEAD
Routes.use(searchRoute);

=======
Routes.use(deleteRoute);
Routes.use(likesRoute);
Routes.use(editRoute);
>>>>>>> 9dae61bc1164c01ced118acdfc2c7a7185cbe546
export default Routes;
