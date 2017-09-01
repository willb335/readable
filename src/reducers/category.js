import { SET_CURRENT_CATEGORY, GET_CATEGORIES } from "../actions/categories";

function category(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      const { currentCategory } = action;
      return {
        ...state,
        currentCategory
      };

    case GET_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories
      };

    default:
      return state;
  }
}

export default category;
