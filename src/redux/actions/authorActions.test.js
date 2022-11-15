import * as authorActions from "./authorActions";
import * as types from "./actionTypes";
import { authors } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock"; // mock http requests (test thunk)
import configureMockStore from "redux-mock-store"; // mock redux store (test thunk)
import "@testing-library/jest-dom";

//  ---------- Testing Action Creators ----------
describe("Action Creator - loadAuthorsSuccess ", () => {
  it("should return expected action", () => {
    const expectedAction = { type: types.LOAD_AUTHOR_SUCCESS, authors };
    const action = authorActions.loadAuthorsSuccess(authors);
    expect(action).toEqual(expectedAction);
  });
});

//  ---------- Testing Thunks ----------
const middleware = [thunk];
const mockStore = configureMockStore(middleware); //configureMockStore needs a middleware (thunk)

describe("loadAuthors thunk", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("expected actions should be dispatched on successful request", () => {
    // mock the fetch call for fetching authors
    fetchMock.mock("*", {
      body: authors,
      headers: { "content-type": "application/json" },
    });
    // what actions will be called when dispatching the thunk action creator
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_AUTHOR_SUCCESS, authors },
    ];
    // initialize store with empty array of authors and used to dispatch the action
    const store = mockStore({ authors: [] });
    // dispatch the thunk actions and expect the returned actions (store.getActions()) to match the mocked ones
    return store.dispatch(authorActions.loadAuthors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched on failed request", () => {
    // mock the request to be a failed one
    fetchMock.mock("*", 400);
    // what action is expecting to be dispatch when the fetch request failed
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.API_CALL_ERROR },
    ];
    // initialize the store so you can dispatch the thunk
    const store = mockStore({ authors: [] });
    // dispatch the thunk and check if the actions dispatched match the expected ones
    return store.dispatch(authorActions.loadAuthors()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
