import { SET_CURRENT_POST } from "../actions/postActions";

function currentPost(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_POST:
      const { currentPost } = action;
      return {
        currentPost
      };
    default:
      return state;
  }
}

export default currentPost;
