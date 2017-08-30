import { combineReducers } from "redux";
import posts from "./posts";
import fetchRequests from "./fetchRequests";
import modal from "./modal";
import category from "./category";
import postDetail from "./postDetail";
import currentPost from "./currentPost";
import backButton from "./backButton";
import form from "./editForm";

export default combineReducers({
  posts,
  fetchRequests,
  modal,
  category,
  postDetail,
  currentPost,
  backButton,
  form
});
