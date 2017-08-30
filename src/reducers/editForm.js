import { EDIT_NAME, EDIT_TITLE, EDIT_BODY } from "../actions/editFormAction";

function form(state = {}, action) {
  switch (action.type) {
    const { name, body, title } = action;

    case EDIT_NAME:
      return {
        ...state,
        name
      };
      case EDIT_TITLE:
      return {
        ...state,
        title
      }

      case EDIT_BODY:
      return {
        ...state,
        body
      }
    default:
      return state;
  }
}

export default form;
