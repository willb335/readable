import {
  IS_FETCH_REQUEST_COMPLETE,
  GET_CATEGORIES
} from "../actions/fetchActions";

function fetchRequests(state = {}, action) {
  switch (action.type) {
    case IS_FETCH_REQUEST_COMPLETE:
      const { isComplete } = action;
      return {
        ...state,
        isComplete
      };

    case GET_CATEGORIES:
      const { categories } = action;
      return {
        ...state,
        categories
      };

    default:
      return state;
  }
}

export default fetchRequests;
