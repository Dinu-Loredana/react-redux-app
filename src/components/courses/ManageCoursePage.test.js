import React from "react";
import { ManageCoursePage } from "./ManageCoursePage";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// factory function to call React comp with default values (keeps tests simple, avoid repeating it for each test);
// pass in all the prop the comp requires, including the ones injected by redux.
function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {}, // alternative to MemoryRouter
    match: {},
    course: newCourse,
    loadCourses: () => {},
    loadAuthors: () => {},
    saveCourse: () => {},
  };
  const props = { ...defaultProps, ...args };
  return mount(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  ); // render the comp and its children in the memory
}

// use mount so the child compon is rendered too to test the comp interactions with its child compon (CourseForm) - title input of the form
// with mount a full DOM is created in memory. Enzyme uses jsdom behind the scenes to create it

it("sets error when attempting to save an empty field title", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit"); // simulate submitting an empty form with enzyme - error should appear
  const error = wrapper.find(".alert").first(); // find the error by class 'alert', take the first err
  // error.debug();
  expect(error.text()).toBe("Title required!"); // front-side validation
});

//  Error: Uncaught [Error: Could not find "store" in the context of "Connect(ManageCoursePage)" - solution :
// wrap the test into Provider + store (return mount(<ManageCoursePage {...props} />);)
// export the plain unconnected compon and test this one (add export to the compon + import {ManageCoursePage}) - test the unconnected version of the comp
