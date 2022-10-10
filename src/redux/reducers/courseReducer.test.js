import courseReducer from "./courseReducer";
import * as courseActions from "../actions/courseActions";

// Testing Reducers = given this input, assert this output

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  //arrange
  const initialState = [{ title: "A" }, { title: "B" }]; // don;t create a full course object, omit properties that don't need for test

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

it("should update course when passes  UPDATE_COURSE_SUCCESS", () => {
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
