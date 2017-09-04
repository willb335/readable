import { IS_FETCH_REQUEST_COMPLETE } from "../actions/fetchActions";

function fetchRequests(state = {}, action) {
  switch (action.type) {
    case IS_FETCH_REQUEST_COMPLETE:
      const { isComplete } = action;
      return {
        ...state,
        isComplete
      };

    default:
      return state;
  }
}

export default fetchRequests;
