import express from 'express';
import { getIsFollowed, postFollowUnfollow } from '../controllers/followController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { validateToken } from '../middlewares/validateToken.js';
import followSchema from '../schemas/followSchema.js';

const followRoute = express.Router();

followRoute.get('/isFollowed/:userId',validateToken,getIsFollowed);
followRoute.get('/followUnfollow/:userId',validateToken,postFollowUnfollow);

export default followRoute;