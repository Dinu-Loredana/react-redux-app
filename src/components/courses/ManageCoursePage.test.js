import React from "react";
import { ManageCoursePage } from "./ManageCoursePage";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import * as types from "../../redux/actions/actionTypes";
import * as courseApi from "../../api/courseApi";
import * as authorApi from "../../api/authorApi";
import userEvent from "@testing-library/user-event";
import { loadAuthors } from "../../redux/actions/authorActions";

// factory function to call React comp with default values (keeps tests simple, avoid repeating it for each test);
// pass in all the prop the comp requires, including the ones injected by redux.
function renderManageCoursePage(args) {
  const defaultProps = {
    authors,
    courses,
    history: {}, // alternative to MemoryRouter
    match: {},
    course: newCourse,
    loadCourses: () => {
      return Promise.reject(new Error("fail"));
    },
    loadAuthors: () => {
      return Promise.reject(new Error("error"));
    },
    saveCourse: () => {
      return Promise.resolve({
        id: 2,
        title: "React: The Big Picture",
        slug: "react-big-picture",
        authorId: 1,
        category: "JavaScript",
      });
    },
  };
  const props = { ...defaultProps, ...args };
  return render(
    <MemoryRouter>
      <ManageCoursePage {...props} />
    </MemoryRouter>
  ); // render the comp and its children in the memory
}

describe("handleSave", () => {
  it("should create the course if form is completed correctly", async () => {
    renderManageCoursePage({ courses });
    // negative - if input is empty, show error msg
    let nameInput = screen.getByLabelText("Title");
    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.click(screen.getByText("Save"));
    waitFor(async () =>
      expect(
        screen.getElementsByClassName("alert")[0].toEqual("Title required!")
      )
    );

    // positive - fill in the form corectly
    const addedCourse = {
      id: null,
      title: "New",
      authorId: 1,
      category: "Test",
    };

    nameInput = screen.getByLabelText("Title");
    fireEvent.change(nameInput, { target: { value: "New" } });
    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(categoryInput, { target: { value: "Test" } });
    waitFor(async () =>
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "1" })
      )
    );
    //click the Save button
    fireEvent.click(screen.getByText("Save"));

    // mock saveCourse
    jest
      .spyOn(courseApi, "saveCourse")
      .mockImplementation(() => Promise.resolve(addedCourse));
    const mockDispatch = jest.fn(); //mocking the dispatch function
    await saveCourse()(mockDispatch);

    waitFor(async () => expect(screen.getByText("Saving...")));
    expect(mockDispatch.mock.calls.length).toBe(2); //get all the calls
    //expect(mockHistoryPush).toHaveBeenCalledWith("/courses");

    const history = { history: { push: jest.fn() } };
    waitFor(async () =>
      expect(history.history.push).toBeCalledWith("/courses")
    );
    waitFor(async () =>
      expect(screen.getByText("Course saved!")).toBeInTheDocument()
    );
  });

  it("should update the course", async () => {
    const course = {
      id: 2,
      title: "React: The Big Picture",
      slug: "react-big-picture",
      authorId: 1,
      category: "JavaScript",
    };
    <MemoryRouter initialEntries={["/course/react-big-picture"]}>
      {renderManageCoursePage({ course })}
    </MemoryRouter>;
    waitFor(async () =>
      expect(screen.getByText("Edit Course")).toBeInTheDocument()
    );
    const editedCourse = {
      id: 2,
      title: "React - edited course",
      slug: "react-big-picture",
      authorId: 1,
      category: "JavaScript",
    };
    const nameInput = screen.getByLabelText("Title");
    waitFor(async () => expect(nameInput.value).toEqual(course.title));
    fireEvent.change(nameInput, { target: { value: "React - edited course" } });

    fireEvent.click(screen.getByText("Save"));

    jest
      .spyOn(courseApi, "saveCourse")
      .mockImplementation(() => Promise.resolve(editedCourse));
    const mockDispatch = jest.fn(); //mocking the dispatch function
    await saveCourse()(mockDispatch);

    waitFor(async () => expect(screen.getByText("Saving...")));
    waitFor(async () =>
      expect(screen.getByText("Course saved!")).toBeInTheDocument()
    );
    waitFor(async () =>
      expect(screen.getByText("React - edited course")).toBeInTheDocument()
    );
  });
});

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
    // expect(nameInput.value).toEqual("Excel");
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
    const nameInput = screen.getByLabelText("Title");
    const categoryInput = screen.getByLabelText("Category");
    waitFor(async () =>
      userEvent.selectOptions(screen.getByRole("option", { name: "" }))
    );

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.change(categoryInput, { target: { value: "" } });
    //Save form
    fireEvent.click(screen.getByText("Save"));
    waitFor(async () =>
      expect(
        screen.getElementsByClassName("alert")[0].toEqual("Title required!")
      )
    );
    waitFor(async () =>
      expect(
        screen.getElementsByClassName("alert")[1].toEqual("Author required!")
      )
    );
    waitFor(async () =>
      expect(
        screen.getElementsByClassName("alert")[2].toEqual("Category required!")
      )
    );
  });
  it("should be valid if form is completed", () => {
    renderManageCoursePage({ courses });
    const nameInput = screen.getByLabelText("Title");
    const categoryInput = screen.getByLabelText("Category");
    fireEvent.change(nameInput, { target: { value: "Excel" } });
    fireEvent.change(categoryInput, { target: { value: "Random" } });
    waitFor(async () =>
      userEvent.selectOptions(screen.getByRole("option", { name: "1" }))
    );
    fireEvent.click(screen.getByText("Save"));
    waitFor(async () =>
      expect(
        screen.getElementsByClassName("alert")[0].not.toEqual("Title required!")
      )
    );
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
    });

    const mockDispatch = jest.fn(); //mocking the dispatch function
    loadCourses()(mockDispatch);
    //await waitFor(() => loadCourses()(mockDispatch));
    waitFor(async () =>
      expect(screen.findByText(/Error fetching courses/).toBeInTheDocument())
    );
  });
});

describe("loadAuthors", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call loadAuthors thunk to fetch data if courses length is 0", async () => {
    renderManageCoursePage({ authors: [] });
    jest
      .spyOn(authorApi, "getAuthors")
      .mockImplementation(() => Promise.resolve(authors));
    const mockDispatch = jest.fn();
    await loadAuthors()(mockDispatch);
    const expectedAction = [
      {
        type: types.BEGIN_API_CALL,
      },
      {
        type: types.LOAD_AUTHOR_SUCCESS,
        authors,
      },
    ];
    expect(mockDispatch.mock.calls.length).toBe(2); //get all the calls
    waitFor(async () =>
      expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    );
  });

  it("should show error if loadAuthors fails", async () => {
    renderManageCoursePage({ authors: [] });
    jest.spyOn(authorApi, "getAuthors").mockImplementation(() => {
      return Promise.reject(new Error("error"));
    });

    const mockDispatch = jest.fn(); //mocking the dispatch function
    //loadAuthors()(mockDispatch);
    await loadAuthors()(mockDispatch);
    waitFor(async () =>
      expect(screen.findByText(/Error fetching authors/).toBeInTheDocument())
    );
  });
});

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
