import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";
import { func } from "prop-types";

// action creators (triggers the reducer by dispatching an action type)
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSE_SUCCESS, courses };
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
//thunk fn to fetch courses async (get request)
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses)); //dispatch actions asynch
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
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
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  // Doing optimistic delete, no dispatching begin/end api call
  // no  beginApiCall or apiCallError since we are not showing loading/error status
  // show UI message succesfully deleted, while on the background the delete is async and don't wait for response to show message; update UI with succesfull msg before API call (delete) finishes
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course)); //immediately dispatch deleteCourse
    return courseApi.deleteCourse(course.id);
  };
}
