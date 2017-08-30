export const EDIT_AUTHOR = "EDIT_AUTHOR";
export const EDIT_TITLE = "EDIT_TITLE";
export const EDIT_BODY = "EDIT_BODY";

export function editAuthor({ author }) {
  return {
    type: EDIT_AUTHOR,
    author
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
