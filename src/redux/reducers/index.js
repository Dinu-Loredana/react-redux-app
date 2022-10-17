import { combineReducers } from "redux";
import { createSelector } from "reselect";
import courses, * as fromCourseReducer from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;

// ideal place to centralize all selectors
// any comp that access data via selectors doesn't need to know in which file the selectors are defined, all selectors are available in root reducer file
export const selectCourses = (state) => state.courses; // selector that returns courses from the redux store state

// memoize the result of sorting the array
export const selectSortedCourses = createSelector(
  selectCourses, //
  (coursesResult) => fromCourseReducer.selectSortedCourses(coursesResult)
);
// createSelector - generates memoized selector functions
// selectCourses - a selector that extract values from whole state, passed in as parameter to the memoized selector
// another parameter is the "output" selector (a funct) that receives the extracted values (coursesResult is the result of selectCourses fn) and should return a derived value (sorted array)
// if the generated selector is called multiple times, the output will only be recalculated when the extracted values have changed.

// before using reselect for memoizing
// export const selectSortedCourses = (state) =>
//   fromCourseReducer.selectSortedCourses(state.courses);

// https://www.youtube.com/watch?v=frT3to2ACCw
