import courseReducer from "./courseReducer";
import * as courseActions from "../actions/courseActions";
import { courses } from "../../../tools/mockData";

// Testing Reducers = given this input, assert this output
describe("course reducer", () => {
  it("should return the initial state", () => {
    expect(courseReducer(undefined, {})).toEqual([]); //courses state is an aray
  });

  it("should handle CREATE_COURSE_SUCCESS", () => {
    //arrange
    const initialState = [{ title: "A" }, { title: "B" }]; // don't create a full course object, omit properties that don't need for test
    const newCourse = { title: "C" };
    const action = courseActions.createCourseSuccess(newCourse);
    //act
    const newState = courseReducer(initialState, action);
    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual("A");
    expect(newState[1].title).toEqual("B");
    expect(newState[2].title).toEqual("C");
  });

  it("should handle UPDATE_COURSE_SUCCESS", () => {
    // arrange (provide the data)
    const initialState = [
      { id: 1, title: "A" },
      { id: 2, title: "B" },
      { id: 3, title: "C" },
    ];
    const updatedCourse = { id: 2, title: "New Title" };
    const action = courseActions.updateCourseSuccess(updatedCourse);

    // act
    const newState = courseReducer(initialState, action);
    const updatedState = newState.find((a) => a.id === updatedCourse.id);
    const untouchedState = newState.find((a) => a.id == 1);

    // assert
    expect(updatedState.title).toEqual("New Title");
    expect(untouchedState.title).toEqual("A");
    expect(newState.length).toEqual(3);
  });

  it("should handle LOAD_COURSE_SUCCESS", () => {
    // arrange
    const initialState = [];
    const action = courseActions.loadCoursesSuccess(courses);
    // act
    const newState = courseReducer(initialState, action);
    // assert
    expect(newState[0].category).toEqual("JavaScript");
    expect(newState[0].title).toEqual("Securing React Apps with Auth0");
    expect(newState.length).toEqual(10);
  });

  it("should handle DELETE_COURSE_OPTIMISTIC", () => {
    // arrange
    const initialState = courses;
    const deletedCourse = courses[0];
    const action = courseActions.deleteCourseOptimistic(deletedCourse);
    //act
    const newState = courseReducer(initialState, action);
    // assert
    expect(newState.length).toEqual(9);
  });
});
