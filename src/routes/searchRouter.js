import express from "express";
import { getNameById, searchAllUsers, searchUser, searchUserId } from "../controllers/searchController.js";

const searchRoute = express.Router();

searchRoute.get("/search", searchUser);
searchRoute.get("/search/:id", searchUserId);
searchRoute.get("/name/:id", getNameById);
searchRoute.get("/searchs", searchAllUsers);


export {searchRoute};