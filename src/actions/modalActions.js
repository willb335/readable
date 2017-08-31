export const IS_MODAL_OPEN = "IS_MODAL_OPEN";
export const IS_COMMENT_MODAL_OPEN = "IS_COMMENT_MODAL_OPEN";

export function isModalOpen({ isModalOpen = false }) {
  return {
    type: IS_MODAL_OPEN,
    isModalOpen
  };
}

export function isCommentModalOpen({ isCommentModalOpen = false }) {
  return {
    type: IS_COMMENT_MODAL_OPEN,
    isCommentModalOpen
  };
}
