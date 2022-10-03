import * as types from "./actionTypes";

// action creator (return action type)
export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}
