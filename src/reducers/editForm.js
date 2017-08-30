import { EDIT_AUTHOR, EDIT_TITLE, EDIT_BODY } from "../actions/editFormAction";

function form(state = {}, action) {
  switch (action.type) {
    case EDIT_AUTHOR:
      const { author } = action;
      return {
        ...state,
        author
      };
    case EDIT_TITLE:
      const { title } = action;
      return {
        ...state,
        title
      };
    case EDIT_BODY:
      const { body } = action;
      return {
        ...state,
        body
      };
    default:
      return state;
  }
}

export default form;
