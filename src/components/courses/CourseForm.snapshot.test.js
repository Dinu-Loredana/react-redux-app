import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { authors, courses } from "../../../tools/mockData";

// check if the label of Save button is properly set to 'Saving...' when saving state is true
it("sets submit label button to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()} // creates an empty mock function
      onSave={jest.fn()}
      errors={{}}
      saving //pass the props that the component receives, use mock data (same mock data is used for Mock API)
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit label button to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()}
      onSave={jest.fn()}
      errors={{}}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
