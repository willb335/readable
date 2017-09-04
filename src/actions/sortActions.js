export const IS_POST_SORTED_BY_VOTE = "IS_POST_SORTED_BY_VOTE";
export const IS_POST_SORTED_BY_TIMESTAMP = "IS_POST_SORTED_BY_TIMESTAMP";
export const IS_COMMENT_SORTED_BY_VOTE = "IS_COMMENT_SORTED_BY_VOTE";
export const IS_COMMENT_SORTED_BY_TIMESTAMP = "IS_COMMENT_SORTED_BY_TIMESTAMP";

export function isPostSortedByVote({ isPostSortedByVote }) {
  return {
    type: IS_POST_SORTED_BY_VOTE,
    isPostSortedByVote
  };
}

export function isPostSortedByTimestamp({ isPostSortedByTimestamp }) {
  return {
    type: IS_POST_SORTED_BY_TIMESTAMP,
    isPostSortedByTimestamp
  };
}

export function isCommentSortedByVote({ isCommentSortedByVote }) {
  return {
    type: IS_COMMENT_SORTED_BY_VOTE,
    isCommentSortedByVote
  };
}

export function isCommentSortedByTimestamp({ isCommentSortedByTimestamp }) {
  return {
    type: IS_COMMENT_SORTED_BY_TIMESTAMP,
    isCommentSortedByTimestamp
  };
}
