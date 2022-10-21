import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import sortParams from "./sortReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
  sortParams,
});

export default rootReducer;

// ideal place to centralize all selectors
// any comp that access data via selectors doesn't need to know in which file the selectors are defined, all selectors are available in root reducer file

// memoize the result of sorting the array - selector that sort by title only alphabetically
// export const selectSortedCourses = createSelector(
//   coursesSelector,
//   (coursesResult) => fromCourseReducer.selectSortedCourses(coursesResult)
// );
// createSelector - generates memoized selector functions
// selectCourses - a selector that extract values from whole state, passed in as parameter to the memoized selector
// another parameter is the "output" selector (a funct) that receives the extracted values (coursesResult is the result of selectCourses fn) and should return a derived value (sorted array)
// if the generated selector is called multiple times, the output will only be recalculated when the extracted values have changed.

// before using reselect for memoizing
// export const selectSortedCourses = (state) =>
//   fromCourseReducer.selectSortedCourses(state.courses);

// https://www.youtube.com/watch?v=frT3to2ACCw

// sort
// function orderByType(data, type) {
//   switch (type) {
//     case "date":
//       return Date.parse(data);
//     case "float":
//       return parseFloat(data);
//     default:
//       return data;
//   }
// }
