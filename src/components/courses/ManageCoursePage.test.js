import React from "react";
import { ManageCoursePage } from "./ManageCoursePage";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { loadCourses } from "../../redux/actions/courseActions";
import * as types from "../../redux/actions/actionTypes";
import * as courseApi from "../../api/courseApi";
import userEvent from "@testing-library/user-event";

// factory function to call React comp with default values (keeps tests simple, avoid repeating it for each test);
// pass in all the prop the comp requires, including the ones injected by redux.
function renderManageCoursePage(args) {
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
  return render(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  ); // render the comp and its children in the memory
}

describe("handleChange", () => {
  it("should set the form and save them to course state", async () => {
    renderManageCoursePage({ courses });
    const course = newCourse;
    const nameInput = screen.getByLabelText("Title");
    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(nameInput, { target: { value: "Excel" } });
    fireEvent.change(categoryInput, { target: { value: "Random" } });
    waitFor(async () =>
      userEvent.selectOptions(screen.getByRole("option", { name: "1" }))
    );
    expect(nameInput.value).toEqual("Excel");
    waitFor(async () => expect(course.title).toEqual("Excel"));
    expect(categoryInput.value).toEqual("Random");
    waitFor(async () => expect(course.category).toEqual("Random"));
    waitFor(async () =>
      expect(screen.getByRole("option", { name: "1" }).selected).toBeTruthy()
    );
    waitFor(async () => expect(course.authorId).toEqual("1"));
  });
});

describe("formIsValid", () => {
  it("should set error if form is not corectly completed", async () => {
    renderManageCoursePage({ courses });
    const errors = {};
    const nameInput = screen.getByLabelText("Title");
    const categoryInput = screen.getByLabelText("Category");
    waitFor(async () =>
      userEvent.selectOptions(screen.getByRole("option", { name: "" }))
    );

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(categoryInput, { target: { value: "" } });
    // fire click event
    fireEvent.click(screen.getByText("Save"));
    // errors.title = "Title required!";
    // errors.category = "Category required!";
    // errors.author = "Author required!";
    // const isValid = Object.keys(errors).length === 0;
    //expect(screen.find).toEqual("Title required!");
    // expect(errors.category).toEqual("Category required!");
    // expect(errors.author).toEqual("Author required!");
    // expect(isValid).toBeFalsy();
  });
  it("should be valid if form is completed", () => {
    renderManageCoursePage({ courses });
    const errors = {};
    const nameInput = screen.getByLabelText("Title");
    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(nameInput, { target: { value: "Excel" } });
    fireEvent.change(categoryInput, { target: { value: "Random" } });
    waitFor(async () =>
      userEvent.selectOptions(screen.getByRole("option", { name: "1" }))
    );
    const isValid = Object.keys(errors).length === 0;
    expect(isValid).toBeTruthy();
  });
});

describe("loadCourses", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call loadCourses thunk to fetch data if courses length is 0", async () => {
    renderManageCoursePage({ courses: [] });
    jest
      .spyOn(courseApi, "getCourses")
      .mockImplementation(() => Promise.resolve(courses));
    const mockDispatch = jest.fn(); //mocking the dispatch function
    await loadCourses()(mockDispatch);
    const expectedAction = [
      {
        type: types.BEGIN_API_CALL,
      },
      {
        type: types.LOAD_COURSES_SUCCESS,
        courses,
      },
    ];
    expect(mockDispatch.mock.calls.length).toBe(2); //get all the calls
    waitFor(async () =>
      expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    );
  });

  it("should show error if loadCourses fails", async () => {
    renderManageCoursePage({ courses: [] });
    jest.spyOn(courseApi, "getCourses").mockImplementation(() => {
      return Promise.reject(new Error("fail"));

      // return new Promise.reject("error");
    });

    const mockDispatch = jest.fn(); //mocking the dispatch function
    screen.debug(await waitFor(() => loadCourses()(mockDispatch)));

    await waitFor(() => loadCourses()(mockDispatch));

    // expect(e).toMatch("Error fetching courses" + "error");
    waitFor(async () =>
      expect(screen.findByText(/Error fetching courses/).toBeInTheDocument())
    );

    // const expectedFailedAction = [
    //   {
    //     type: types.BEGIN_API_CALL,
    //   },
    //   {
    //     type: types.API_CALL_ERROR,
    //   },
    // ];

    // waitFor(async () =>
    //   expect(mockDispatch).toHaveBeenCalledWith(expectedFailedAction)
    // );
  });
});

// const beginCall = mockDispatch.mock.calls[0];
// const loadCall = mockDispatch.mock.calls[1];
// expect(beginCall[0]).toEqual({
//   type: types.BEGIN_API_CALL,
// });
// expect(loadCall).toEqual([
//   {
//     type: types.LOAD_COURSES_SUCCESS,
//     courses,
//   },
// ]);
// use mount so the child compon is rendered too to test the comp interactions with its child compon (CourseForm) - title input of the form
// with mount a full DOM is created in memory. Enzyme uses jsdom behind the scenes to create it

// it("sets error when attempting to save an empty field title", () => {
//   const wrapper = render();
//   wrapper.find("form").simulate("submit"); // simulate submitting an empty form with enzyme - error should appear
//   const error = wrapper.find(".alert").first(); // find the error by class 'alert', take the first err
//   // error.debug();
//   expect(error.text()).toBe("Title required!"); // front-side validation
// });

//  Error: Uncaught [Error: Could not find "store" in the context of "Connect(ManageCoursePage)" - solution :
// wrap the test into Provider + store (return mount(<ManageCoursePage {...props} />);)
// export the plain unconnected compon and test this one (add export to the compon + import {ManageCoursePage}) - test the unconnected version of the comp
