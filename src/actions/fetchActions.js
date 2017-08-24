export const IS_FETCH_REQUEST_COMPLETE = "IS_FETCH_REQUEST_COMPLETE";

export function isFetchRequestComplete({ isComplete }) {
  return {
    type: IS_FETCH_REQUEST_COMPLETE,
    isComplete
  };
}
