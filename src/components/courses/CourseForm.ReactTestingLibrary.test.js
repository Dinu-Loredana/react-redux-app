import React from "react";
import CourseForm from "./CourseForm";
import { render } from "@testing-library/react";

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
  return render(<CourseForm {...props} />); // render the compon using shallow Enzyme and pass it the props needed
}

it("should render 'Add Course' header ", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
  //   const comp = renderCourseForm();
  //   console.log(comp);
  //   comp.getByText("Add Course");  // don't have to call expect
});

it("should have label 'Save' when saving is false", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should have label 'Saving...' when saving is true", () => {
  const { getByText } = renderCourseForm({ saving: true });
  // const { getByText, debug } = renderCourseForm({ saving: true });
  // debug();
  getByText("Saving...");
});

/*
React Testing Library:
- alternative to Enzyme
- write tests based on what user sees
- no difference between shallow and mount; with React Testing Library comp are always mounted
- the comp and its children are rendered, to test what the user sees.
- no need to call expect; the assertion is part of the query
- the rendered compon returns debug method (can destructure it), the output is the rendered comp
*/
