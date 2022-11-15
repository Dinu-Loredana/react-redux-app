import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses, newCourse } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock"; // mock http requests (test thunk)
import configureMockStore from "redux-mock-store"; // mock redux store (test thunk)
import "@testing-library/jest-dom";

// ----------  Testing Action Creators ----------
// Goal: assure the action creator returns the expected action
// when I call the createCourseSuccess action creator, I get the expected object shape back (type + course as payload)
describe("testing action creators", () => {
  it("should handle createCourseSuccess action", () => {
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

  it("should handle loadCoursesSuccess action", () => {
    // arrange
    const expectedAction = {
      type: types.LOAD_COURSES_SUCCESS,
      courses,
    };
    // act
    const action = courseActions.loadCoursesSuccess(courses);
    // assert
    expect(action).toEqual(expectedAction);
  });

  it("should handle updateCourseSuccess action", () => {
    // arrange
    const updatedCourse = courses[0];
    const expectedAction = {
      type: types.UPDATE_COURSE_SUCCESS,
      course: updatedCourse,
    };
    // act
    const action = courseActions.updateCourseSuccess(updatedCourse);
    // assert
    expect(action).toEqual(expectedAction);
  });

  it("should handle deleteCourseOptimistic action", () => {
    const deletedCorse = courses[0];
    const expectedAction = {
      type: types.DELETE_COURSE_OPTIMISTIC,
      course: deletedCorse,
    };
    const action = courseActions.deleteCourseOptimistic(deletedCorse);
    expect(action).toEqual(expectedAction);
  });
});

// ---------- Testing Thunks ----------
// Goal: dispatch the thunk action creator from store and returns the expected action types
// mock the api request and the store, dispatch the thunk action creator and expect the result of store.getActions() to match the expected actions for this request
// Test an async action (configureMockStore needs a middleware (thunk is used))
// create mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("test loadCourses Thunk", () => {
  afterEach(() => {
    fetchMock.restore(); // will run after each test
  });
  it("expected actions should be dispatched on successful request", () => {
    // mock the fetch call and returns mock data (because inside thunk there is a fetch call, otherwise: ReferenceError: fetch is not defined)
    fetchMock.mock("*", {
      body: courses,
      headers: { "content-type": "application/json" },
    }); //captures all fetch calls and responds with some mock data, it mimics the resp of the api, without making an actual api call

    // declare the actions expected to be fired from the thunk
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_COURSES_SUCCESS, courses },
    ];

    // initialize the store to contain an empty array of courses
    const store = mockStore({ courses: [] });
    // dispatch loadCourses thunk action creator, call getActions from the mockStore which returns a list of actions that have occured (should match the expected actions declare above)

    return store.dispatch(courseActions.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched on failed request", () => {
    fetchMock.mock("*", 400);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.API_CALL_ERROR },
    ];
    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.loadCourses()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("test saveCourse thunk", () => {
  afterEach(() => {
    fetchMock.restore(); // will run after each test
  });

  it("expected actions should be dispatched on successful request - POST", () => {
    fetchMock.mock("*", {
      body: JSON.stringify(newCourse),
      headers: { "content-type": "application/json" },
    });
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.CREATE_COURSE_SUCCESS, course: newCourse },
    ];
    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.saveCourse(newCourse)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched on successful request - PUT", () => {
    const updatedCourse = { ...newCourse, id: 7 };
    fetchMock.mock("*", {
      body: JSON.stringify(updatedCourse),
      headers: { "content-type": "application/json" },
    });
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.UPDATE_COURSE_SUCCESS, course: updatedCourse },
    ];
    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.saveCourse(updatedCourse)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("expected actions should be dispatched on failed request", () => {
    fetchMock.mock("*", 400);
    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.API_CALL_ERROR },
    ];
    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.saveCourse(newCourse)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("test deleteCourse thunk", () => {
  it("expected action should be dispatched on delete request", () => {
    // mock the fetch request (delete method): courseApi.deleteCourse(course.id);
    fetchMock.mock("*", {
      body: courses[0].id,
      headers: { "content-type": "application/json" },
    });
    const expectedAction = [
      {
        type: types.DELETE_COURSE_OPTIMISTIC,
        course: courses[0],
      },
    ];

    const store = mockStore({ courses });
    // dispatch the delete thunk action that will delete the course passed in that will dispatch the action type DELETE_COURSE_OPTIMISTIC (triggers the reducer which updates the store)
    return store.dispatch(courseActions.deleteCourse(courses[0])).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
/* Testing Thunks
thunks = async => mocking store + http calls
Mock store => redux-mock-store
Mock HTTP Requests => fetch-mock

*/
