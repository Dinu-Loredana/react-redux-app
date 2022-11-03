import * as types from "./actionTypes";

export function setFilterAuthor(author) {
  console.log("setFilterAuthor", author);
  return { type: types.SET_FILTER_AUTHOR, author };
}
