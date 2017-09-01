import {
  SET_CURRENT_CATEGORY,
  IS_CATEGORY_OPEN,
  GET_CATEGORIES
} from "../actions/categories";

function category(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      const { currentCategory } = action;
      return {
        ...state,
        currentCategory
      };

    case IS_CATEGORY_OPEN:
      const { isCategoryOpen } = action;
      return {
        ...state,
        isCategoryOpen
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
