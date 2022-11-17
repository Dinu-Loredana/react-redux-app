import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

// action creators (triggers the reducer by dispatching an action type)
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

//Thunk action creator - returns a function to fetch courses async (get request), instead of an action (object) Since it returns a function it is a special action that is intercepted by redux-thunk middleware. That thunk action creator can dispatch the other action creators at a point in the future.
export function loadCourses() {
  //loadCourses action creator returns a function instead of the regular action object.
  return function (dispatch) {
    //the fn receives the dispatch method from the store.
    dispatch(beginApiCall()); //first dispatch an immediate synchronous action to the store to indicate that you’ve started the API call
    return courseApi
      .getCourses() //make the actual GET request to the server
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses)); // successful resp from the server, you dispatch a synchronous success action with the data received from the response
      })
      .catch((error) => {
        dispatch(apiCallError(error)); //failure resp,  dispatch a different synchronous action with the error message
        //throw error;
        //Promise.reject("error");
      });
  };
}

// thunk fn to save course async (put/post request)
export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course?.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        //throw error;
      });
  };
}

export function deleteCourse(course) {
  // Doing optimistic delete, no dispatching begin/end api call
  // no  beginApiCall or apiCallError since we are not showing loading/error status
  // show UI message succesfully deleted, while on the background the delete is async and don't wait for response to show message; update UI with succesfull msg before API call (delete) finishes
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course)); //immediately dispatch deleteCourse
    return courseApi
      .deleteCourse(course.id)
      .then((courseDeleted) => courseDeleted)
      .catch((error) => {
        return error;
      });
  };
}
