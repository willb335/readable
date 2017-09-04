export const IS_MODAL_OPEN = "IS_MODAL_OPEN";
export const IS_EDIT_POST_MODAL_OPEN = "IS_EDIT_POST_MODAL_OPEN";
export const IS_COMMENT_MODAL_OPEN = "IS_COMMENT_MODAL_OPEN";
export const IS_EDIT_COMMENT_MODAL_OPEN = "IS_EDIT_COMMENT_MODAL_OPEN";

export function isModalOpen({ isModalOpen }) {
  return {
    type: IS_MODAL_OPEN,
    isModalOpen
  };
}

export function isEditPostModalOpen({ isEditPostModalOpen }) {
  return {
    type: IS_EDIT_POST_MODAL_OPEN,
    isEditPostModalOpen
  };
}

export function isCommentModalOpen({ isCommentModalOpen }) {
  return {
    type: IS_COMMENT_MODAL_OPEN,
    isCommentModalOpen
  };
}

export function isEditCommentModalOpen({ isEditCommentModalOpen }) {
  return {
    type: IS_EDIT_COMMENT_MODAL_OPEN,
    isEditCommentModalOpen
  };
}
