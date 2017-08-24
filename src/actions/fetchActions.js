export const IS_FETCH_REQUEST_COMPLETE = "IS_FETCH_REQUEST_COMPLETE";
export const GET_CATEGORIES = "GET_CATEGORIES";

export function isFetchRequestComplete({ isComplete }) {
  return {
    type: IS_FETCH_REQUEST_COMPLETE,
    isComplete
  };
}

export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  };
}
