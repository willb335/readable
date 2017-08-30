export const IS_MODAL_OPEN = "IS_MODAL_OPEN";

export function isModalOpen({ isModalOpen = false }) {
  return {
    type: IS_MODAL_OPEN,
    isModalOpen
  };
}
