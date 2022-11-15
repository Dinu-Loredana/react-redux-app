import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

//action creator - returns an action (object)
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

//thunk action creator - returns a function instead of an action (that dispatches action types)
export function loadAuthors() {
  // loadAuthors func wraps 'dispatch' fn, so it can run later
  return function (dispatch) {
    dispatch(beginApiCall()); //dispatch action that will incr/decrem apiCallsInProgress state - used for showing Spinner
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors)); //dispatch action asynch
      })
      .catch((error) => {
        dispatch(apiCallError(error)); //redux is notified that the api call is completed (even if it hs failed) by dispatch the action type specific for it
        throw error;
      });
  };
}
