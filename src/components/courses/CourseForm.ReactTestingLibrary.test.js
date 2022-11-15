import React from "react";
import CourseForm from "./CourseForm";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

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
  return render(<CourseForm {...props} />); // render the compon and pass it the props needed
}

describe("CourseForm", () => {
  it("should render 'Add Course' header ", () => {
    const { getByText } = renderCourseForm();
    getByText("Add Course");
    //   const comp = renderCourseForm();
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

  it("should render errors onSave", async () => {
    const { findByRole } = renderCourseForm({
      errors: { onSave: "An error occured" },
    });
    const errorEl = await findByRole("alert");
    expect(errorEl).toBeInTheDocument();
  });
  it("should have 2 inputs and 1 select", () => {
    const { getByLabelText } = renderCourseForm();
    const title = getByLabelText("Title");
    const category = getByLabelText("Category");
    const author = getByLabelText("Author");
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });
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
