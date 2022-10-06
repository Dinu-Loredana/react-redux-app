import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course,
    };
    // act
    const action = courseActions.createCourseSuccess(course);
    // assert
    expect(action).toEqual(expectedAction);
  });
});

// Goal: assure the action creator returns the expected action
// when I call CREATE_COURSE_SUCCESS action creator, I get the expected object shape back (type + course as payload)
