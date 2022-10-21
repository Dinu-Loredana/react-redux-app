import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function sortReducer(state = initialState.sortParams, action) {
  switch (action.type) {
    case types.SET_SORT_PARAMS:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
}
