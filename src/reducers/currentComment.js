import { SET_CURRENT_COMMENT } from "../actions/commentActions";

function currentComment(state = {}, action) {
  const { currentComment } = action;
  switch (action.type) {
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        currentComment
      };

    default:
      return state;
  }
}

export default currentComment;
