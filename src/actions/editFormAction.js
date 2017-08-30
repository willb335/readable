export const EDIT_NAME = "EDIT_NAME";
export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_BODY = "EDIT_BODY";

export function editName({ name }) {
  return {
    type: EDIT_NAME,
    name
  };
}

export function editTitle({ title }) {
  return {
    type: EDIT_TITLE,
    title
  };
}

export function editBody({ body }) {
  return {
    type: EDIT_BODY,
    body
  };
}
