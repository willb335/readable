import { IS_POST_DETAIL_OPEN } from "../actions/postDetailActions";

function postDetail(state = {}, action) {
  switch (action.type) {
    case IS_POST_DETAIL_OPEN:
      const { isPostDetailOpen } = action;
      return {
        ...state,
        isPostDetailOpen
      };

    default:
      return state;
  }
}

export default postDetail;
