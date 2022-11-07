import authorReducer from "./authorReducer";
import * as authorActions from "../actions/authorActions";
import { authors } from "../../../tools/mockData";

describe("author reducer", () => {
  it("should handle LOAD_AUTHOR_SUCCESS", () => {
    // arrange
    const initialState = [];
    const action = authorActions.loadAuthorsSuccess(authors);
    // act
    const newState = authorReducer(initialState, action);
    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual("Cory House");
  });
});
