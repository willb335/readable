export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const EDIT_SCORE = "EDIT_SCORE";
export const REORDER_POST_BY_SCORE = "REORDER_POST_BY_SCORE";
export const REORDER_POST_BY_TIMESTAMP = "REORDER_POST_BY_TIMESTAMP";
export const REORDER_COMMENT_BY_SCORE = "REORDER_COMMENT_BY_SCORE";
export const REORDER_COMMENT_BY_TIMESTAMP = "REORDER_COMMENT_BY_TIMESTAMP";

export function addRecipe({ day, recipe, meal }) {
  return {
    type: ADD_RECIPE,
    recipe,
    day,
    meal
  };
}

export function removeFromCalendar({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal
  };
}
