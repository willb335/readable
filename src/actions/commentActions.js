export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const SET_CURRENT_COMMENT = "SET_CURRENT_COMMENT";

export function addComment({
  id,
  parentId,
  timestamp,
  body,
  author,
  category,
  voteScore,
  deleted,
  parentDeleted
}) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    category,
    voteScore,
    deleted,
    parentDeleted
  };
}
export function editComment({
  id,
  parentId,
  timestamp,
  body,
  author,
  category,
  voteScore,
  deleted,
  parentDeleted
}) {
  return {
    type: EDIT_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    category,
    voteScore,
    deleted,
    parentDeleted
  };
}

export function setCurrentComment({ currentComment }) {
  return {
    type: SET_CURRENT_COMMENT,
    currentComment
  };
}
