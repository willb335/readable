export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
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

export function removePost({ id }) {
  return {
    type: REMOVE_POST,
    id
  };
}

export function editPost({
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
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  };
}
