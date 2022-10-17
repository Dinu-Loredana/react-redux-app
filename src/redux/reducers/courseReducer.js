import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );

    case types.LOAD_COURSE_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}

// selector - funct used for computing derivated data or relational data (takes in the whole redux state and return the piece of state neeeded and manipulated)
// takes in state and returns just the courses sorted alphabetically
// selectors recalculate the data every time they are called -> memoization: save the cached result of func when the fn is called again with the same param
// Reselect - specify which parts of the state are used for the computation and if these parts of the state are not changed it won't recalculate the derivate data, justreturns the cached result

export const selectSortedCourses = (state) => {
  // sort() mutates the original array; copy the array before sorting it
  return [...state].sort((c1, c2) => c1.title.localeCompare(c2.title));
};
