import apiStatusReducer from "./apiStatusReducer";
import * as apiStatusActions from "../actions/apiStatusActions";

describe("apiStatusReducer", () => {
  it("should handle BEGIN_API_CALL", () => {
    // arrange
    const initialState = 0;
    const action = apiStatusActions.beginApiCall();
    // act
    const newState = apiStatusReducer(initialState, action);
    // assert
    expect(newState).toEqual(1);
  });

  it("should handle API_CALL_ERROR", () => {
    // arrange
    const initialState = 1;
    const action = apiStatusActions.apiCallError();
    // act
    const newState = apiStatusReducer(initialState, action);
    // assert
    expect(newState).toEqual(0);
  });
});
