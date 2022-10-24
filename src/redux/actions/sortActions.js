import * as types from "./actionTypes";
import { get } from "lodash";

export function clearSortParams() {
  return {
    type: types.SET_SORT_PARAMS,
    payload: {
      data: { key: "", order: "" },
    },
  };
}

// thunk to sort data based on key
export function setSortParams(sortKey) {
  return (dispatch, getState) => {
    const { sortParams } = getState();
    const order = get(sortParams, "order");

    dispatch({
      type: types.SET_SORT_PARAMS,
      payload: {
        data: {
          key: sortKey,
          order: order === "desc" ? "asc" : "desc",
        },
      },
    });
  };
}
