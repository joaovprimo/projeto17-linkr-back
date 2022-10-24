import express from "express";
import { getNameById, searchUser, searchUserId } from "../controllers/searchController.js";

const searchRoute = express.Router();

searchRoute.get("/search", searchUser);
searchRoute.get("/search/:id", searchUserId);
searchRoute.get("/name/:id", getNameById);


export {searchRoute};