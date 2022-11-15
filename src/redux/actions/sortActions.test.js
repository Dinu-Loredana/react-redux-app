import * as sortActions from "./sortActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store"; // mock redux store (test thunk)

//  ---------- Testing Action Creators ----------
describe("Action Creator - clearSortParams", () => {
  it("should return expected action", () => {
    const expectedAction = {
      type: types.SET_SORT_PARAMS,
      payload: {
        data: { key: "", order: "" },
      },
    };
    const action = sortActions.clearSortParams();
    expect(action).toEqual(expectedAction);
  });
});

//  ---------- Testing Thunk ----------
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("setSortParams thunk", () => {
  it("expected actions should be dispatched on sorting data", () => {
    let dummySortKey = "title";
    const store = mockStore({ sortParams: { key: "", order: "" } });
    const { sortParams } = store.getState();
    const { order } = sortParams;

    const expectedAction = [
      {
        type: types.SET_SORT_PARAMS,
        payload: {
          data: {
            key: dummySortKey,
            order: order === "desc" ? "asc" : "desc",
          },
        },
      },
    ];

    store.dispatch(sortActions.setSortParams(dummySortKey));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
