import express from "express";
import { searchUser } from "../controllers/searchController.js";

const searchRoute = express.Router();

searchRoute.get("/search", searchUser);

export {searchRoute};