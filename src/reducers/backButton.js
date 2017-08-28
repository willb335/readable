import { IS_BACK_BUTTON_CLICKED } from "../actions/backButtonAction";

function backButton(state = {}, action) {
  switch (action.type) {
    case IS_BACK_BUTTON_CLICKED:
      const { isBackButtonClicked } = action;
      return {
        ...state,
        isBackButtonClicked
      };

    default:
      return state;
  }
}

export default backButton;
