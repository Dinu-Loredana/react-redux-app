import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock"; // mock http requests
import configureMockStore from "redux-mock-store"; // mock redux store

// ---------- Testing Thunks ----------
// Test an async action (configureMockStore needs a middleware (thunk is used))
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore(); // will run after each test
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_CALL_API and LOAD_COURSES_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" },
      }); //captures all fetch calls and responds with some mock data, it mimics the resp of the api, without making an actal api call

      // declare the actions expected to be fired from the thunk
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses },
      ];

      //create mock redux store
      const store = mockStore({ courses: [] }); // initialize the store to contain an empty array
      // dispatch loadCourses action, call getActions on the mockStore which returns a list of actions that have occured (should match the expected actions declare above)
      //console.log(store.dispatch(courseActions.loadCourses()));
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

/* Testing Thunks
thunks = async => mocking store + http calls
Mock store => redux-mock-store
Mock HTTP Requests => fetch-mock

*/

// ----------  Testing Action Creators ----------
// Goal: assure the action creator returns the expected action
// when I call CREATE_COURSE_SUCCESS action creator, I get the expected object shape back (type + course as payload)
describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };
    // act
    const action = courseActions.createCourseSuccess(course);
    // assert
    expect(action).toEqual(expectedAction);
  });
});
