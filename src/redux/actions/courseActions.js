import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

// action creator (triggers the reducer)
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course };
}
// action creator (triggers the reducer)
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSE_SUCCESS, courses };
}

//thunk
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
