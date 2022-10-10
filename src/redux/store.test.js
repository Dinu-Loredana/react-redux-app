import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating course", () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course1 = { id: 1, title: "React" };
  const course2 = { id: 2, title: "JavaScript" };
  const updatedCourse = { id: 1, title: "ReactJS" };

  // act
  const action1 = courseActions.createCourseSuccess(course1);
  const action2 = courseActions.createCourseSuccess(course2);
  store.dispatch(action1);
  store.dispatch(action2);
  const action3 = courseActions.updateCourseSuccess(updatedCourse);
  store.dispatch(action3);
  // assert
  const createdCourse = store.getState().courses[1]; // get the course from the store
  expect(createdCourse).toEqual(course2);
  const updatedState = store.getState().courses[0];
  expect(updatedState.title).toEqual(updatedCourse.title);
});
