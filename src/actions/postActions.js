export const ADD_POST = "ADD_POST";
export const SET_CURRENT_POST = "SET_CURRENT_POST";
export const EDIT_POST = "EDIT_POST";
export const EDIT_SCORE = "EDIT_SCORE";
export const REORDER_POST_BY_SCORE = "REORDER_POST_BY_SCORE";
export const REORDER_POST_BY_TIMESTAMP = "REORDER_POST_BY_TIMESTAMP";
export const REORDER_COMMENT_BY_SCORE = "REORDER_COMMENT_BY_SCORE";
export const REORDER_COMMENT_BY_TIMESTAMP = "REORDER_COMMENT_BY_TIMESTAMP";

export function addPost({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted
}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  };
}

export function setCurrentPost({ currentPost }) {
  return {
    type: SET_CURRENT_POST,
    currentPost
  };
}

export function editPost({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted
}) {
  return {
    type: EDIT_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  };
}
