import { combineReducers } from "redux";

import { ADD_POST, EDIT_POST, REMOVE_POST } from "../actions";

function newPost(state = {}, action) {
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
  }
}

export default combineReducers({});
