export const IS_BACK_BUTTON_CLICKED = "IS_BACK_BUTTON_CLICKED";

export function isBackButtonClicked({ isBackButtonClicked }) {
  return {
    type: IS_BACK_BUTTON_CLICKED,
    isBackButtonClicked
  };
}
