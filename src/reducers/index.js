import { combineReducers } from "redux";
import posts from "./posts";
import fetchRequests from "./fetchRequests";
import modal from "./modal";
import category from "./category";
import postDetail from "./postDetail";
import currentPost from "./currentPost";
import form from "./editForm";
import sorts from "./sorts";
import comments from "./comments";
import currentComment from "./currentComment";

export default combineReducers({
  posts,
  fetchRequests,
  modal,
  category,
  postDetail,
  currentPost,
  form,
  sorts,
  comments,
  currentComment
});
