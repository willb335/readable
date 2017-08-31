import { ADD_COMMENT } from "../actions/commentActions";

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

    // case REMOVE_POST:
    //   return {
    //     ...state,
    //     [id]: {
    //       deleted: true
    //     }
    //   };
    // case EDIT_POST:
    //   return {
    //     ...state,
    //     [id]: {
    //       id,
    //       timestamp,
    //       title,
    //       body,
    //       author,
    //       category,
    //       voteScore,
    //       deleted
    //     }
    //   };

    default:
      return state;
  }
}

export default comments;
