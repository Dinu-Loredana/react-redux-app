import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

// factory function to call React comp with default values (keeps tests simple, avoid repeating it for each test)
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />); // render the compon using shallow Enzyme and pass it the props needed
}

it("should render form and header", () => {
  const wrapper = renderCourseForm(); // render the component with default props
  // console.log(wrapper.debug())
  expect(wrapper.find("form").length).toBe(1); //FIND func accepts CSS selector
  expect(wrapper.find("h2").text()).toEqual("Add Course"); // find by tag name
});

it("should have label 'Save' when saving is false", () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it("should have label 'Saving...' when saving is true", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
