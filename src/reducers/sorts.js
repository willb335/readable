import {
  IS_POST_SORTED_BY_VOTE,
  IS_POST_SORTED_BY_TIMESTAMP,
  IS_COMMENT_SORTED_BY_VOTE,
  IS_COMMENT_SORTED_BY_TIMESTAMP
} from "../actions/sortActions";

function sorts(state = {}, action) {
  const {
    isPostSortedByVote,
    isPostSortedByTimestamp,
    isCommentSortedByVote,
    isCommentSortedByTimestamp
  } = action;

  switch (action.type) {
    case IS_POST_SORTED_BY_VOTE:
      return {
        ...state,
        isPostSortedByVote
      };

    case IS_POST_SORTED_BY_TIMESTAMP:
      return {
        ...state,
        isPostSortedByTimestamp
      };
    case IS_COMMENT_SORTED_BY_VOTE:
      return {
        ...state,
        isCommentSortedByVote
      };
    case IS_COMMENT_SORTED_BY_TIMESTAMP:
      return {
        ...state,
        isCommentSortedByTimestamp
      };

    default:
      return state;
  }
}

export default sorts;
