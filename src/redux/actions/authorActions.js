import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "../actions/apiStatusActions";

//action creator
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

//thunk
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
        throw error;
      });
  };
}
