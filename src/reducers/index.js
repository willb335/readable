import { combineReducers } from "redux";
import posts from "./posts";
import fetchRequests from "./fetchRequests";
import modal from "./modal";

export default combineReducers({
  posts,
  fetchRequests,
  modal
});
