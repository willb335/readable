import { ADD_COMMENT, EDIT_COMMENT } from "../actions/commentActions";

function comments(state = {}, action) {
  const {
    id,
    parentId,
    timestamp,
    body,
    author,
    category,
    voteScore,
    deleted,
    parentDeleted
  } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        [id]: {
          id,
          parentId,
          timestamp,
          body,
          author,
          category,
          voteScore,
          deleted,
          parentDeleted
        }
      };
    case EDIT_COMMENT:
      return {
        ...state,
        [id]: {
          id,
          parentId,
          timestamp,
          body,
          author,
          category,
          voteScore,
          deleted,
          parentDeleted
        }
      };

    default:
      return state;
  }
}

export default comments;
