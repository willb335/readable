import { SET_CURRENT_COMMENT } from "../actions/commentActions";

function currentComment(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_COMMENT:
      const { currentComment } = action;
      return {
        currentComment
      };
    default:
      return state;
  }
}

export default currentComment;
