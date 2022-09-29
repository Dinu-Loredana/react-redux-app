import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// action creator (triggers the reducer)
// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }
// action creator (triggers the reducer)
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSE_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}
//thunk fn to fetch courses async (get request)
export function loadCourses() {
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses)); //dispatch actions asynch
      })
      .catch((error) => {
        throw error;
      });
  };
}

// thunk fn to save course async (put/post request)
export function saveCourse(course) {
  return function (dispatch) {
    return courseApi
      .saveCourse()
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}
