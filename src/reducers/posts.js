import { ADD_POST, EDIT_POST, REMOVE_POST } from "../actions/postActions";

function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      const {
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted
      } = action;

      return {
        ...state,
        [id]: {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          voteScore,
          deleted
        }
      };
    case REMOVE_POST:
      return {
        ...state,
        [id]: {
          deleted: true
        }
      };
    case EDIT_POST:
      return {
        ...state,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted
      };

    default:
      return state;
  }
}

export default posts;
