const IS_GET_REQUEST_COMPLETE = "IS_GET_REQUEST_COMPLETE";

export function isGetRequestComplete({ isComplete }) {
  return {
    type: IS_GET_REQUEST_COMPLETE,
    isComplete
  };
}
