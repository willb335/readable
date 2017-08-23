import { combineReducers } from "redux";

import { ADD_POST, EDIT_POST, REMOVE_POST } from "../actions";

function post(state = {}, action) {
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
      }
      case REMOVE_POST:
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
          deleted: true;
        }
      }


    default:
      return state;
  }
}



export default combineReducers({});
