import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function filterReducer(
  state = initialState.filteredAuthor,
  action
) {
  switch (action.type) {
    case types.SET_FILTER_AUTHOR:
      return action.author;
    default:
      return state;
  }
}
