import { combineReducers } from "redux";
import posts from "./posts";
import fetchRequests from "./fetchRequests";

export default combineReducers({
  posts,
  fetchRequests
});
