export const IS_POST_DETAIL_OPEN = "IS_POST_DETAIL_OPEN";

export function isPostDetailOpen({ isPostDetailOpen }) {
  return {
    type: IS_POST_DETAIL_OPEN,
    isPostDetailOpen
  };
}
