import { combineReducers } from "redux";
import posts from "./posts";
import authReduce from "./auth";

export default combineReducers({ posts , authReduce })