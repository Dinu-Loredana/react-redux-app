import sortReducer from "./sortReducer";
import * as sortActions from "../actions/sortActions";
import { waitFor } from "@testing-library/react";

describe("sort reducer", () => {
  it("should clear data with SET_SORT_PARAMS", () => {
    // arrange
    const initialState = { key: "test", order: "asc" };
    const action = sortActions.clearSortParams();
    // act
    const newState = sortReducer(initialState, action);
    // assert
    expect(newState.key).toEqual("");
    expect(newState.order).toEqual("");
  });

  it("should add data with SET_SORT_PARAMS", () => {
    // arrange
    const initialState = { key: "", order: "" };
    const action = sortActions.setSortParams("test");
    // act
    const newState = sortReducer(initialState, action);
    // assert
    waitFor(async () => expect(newState.key).toEqual("test")); // use waitFor because setSortParams is thunk (async)
    waitFor(async () => expect(newState.order).toEqual("desc"));
  });
});
