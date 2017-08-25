import { SET_CURRENT_CATEGORY } from "../actions/categories";

function category(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      const { currentCategory } = action;
      return {
        ...state,
        currentCategory
      };

    default:
      return state;
  }
}

export default category;
