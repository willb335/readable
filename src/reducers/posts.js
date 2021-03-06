import { ADD_POST, EDIT_POST } from "../actions/postActions";

function posts(state = {}, action) {
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

  switch (action.type) {
    case ADD_POST:
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

    case EDIT_POST:
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

    default:
      return state;
  }
}

export default posts;
