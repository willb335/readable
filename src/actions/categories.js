export const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";

export function setCurrentCategory({ currentCategory }) {
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory
  };
}
