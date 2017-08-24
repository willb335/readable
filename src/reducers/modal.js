import { IS_MODAL_OPEN } from "../actions/modalActions";

function modal(state = {}, action) {
  switch (action.type) {
    case IS_MODAL_OPEN:
      const { isModalOpen } = action;
      return {
        ...state,
        isModalOpen
      };

    default:
      return state;
  }
}

export default modal;
