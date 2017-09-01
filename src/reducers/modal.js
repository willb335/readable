import {
  IS_MODAL_OPEN,
  IS_EDIT_POST_MODAL_OPEN,
  IS_COMMENT_MODAL_OPEN,
  IS_EDIT_COMMENT_MODAL_OPEN
} from "../actions/modalActions";

function modal(state = {}, action) {
  const {
    isModalOpen,
    isEditPostModalOpen,
    isCommentModalOpen,
    isEditCommentModalOpen
  } = action;

  switch (action.type) {
    case IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen
      };

    case IS_EDIT_POST_MODAL_OPEN:
      return {
        ...state,
        isEditPostModalOpen
      };

    case IS_COMMENT_MODAL_OPEN:
      return {
        ...state,
        isCommentModalOpen
      };

    case IS_EDIT_COMMENT_MODAL_OPEN:
      return {
        ...state,
        isEditCommentModalOpen
      };

    default:
      return state;
  }
}

export default modal;
