import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

//action creator
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

//thunk
export function loadAuthors() {
  // loadAuthors func wraps 'dispatch' fn, so it can run later
  return function (dispatch) {
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
