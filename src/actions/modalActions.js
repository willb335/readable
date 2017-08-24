export const IS_MODAL_OPEN = "IS_MODAL_OPEN";

export function isModalOpen({ isModalOpen }) {
  return {
    type: IS_MODAL_OPEN,
    isModalOpen
  };
}
