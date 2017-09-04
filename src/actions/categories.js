export const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";

export function setCurrentCategory({ currentCategory }) {
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory
  };
}

export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  };
}
