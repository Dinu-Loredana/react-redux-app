import React from "react";
import { CoursesPage } from "./CoursesPage";
import { courses, authors, newCourse } from "../../../tools/mockData";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as courseApi from "../../api/courseApi";
import * as authorApi from "../../api/authorApi";
import {
  clearSortParams,
  setSortParams,
} from "../../redux/actions/sortActions";
import { deleteCourse, loadCourses } from "../../redux/actions/courseActions";
import * as types from "../../redux/actions/actionTypes";
import "@testing-library/jest-dom";
import { loadAuthors } from "../../redux/actions/authorActions";

function renderCoursesPage(args) {
  const defaultProps = {
    authors,
    coursesList: courses,
    loading: false,
    sortParams: { key: "title", order: "desc" },
    history: {}, // alternative to MemoryRouter
    match: {},
    actions: {
      loadCourses: () => {
        return Promise.reject(new Error("fail"));
      },
      loadAuthors: () => {
        return Promise.reject(new Error("error"));
      },
      deleteCourse: () => {
        return Promise.reject(new Error("failed"));
      },
      setSortParams: () => {},
      clearSortParams: () => {},
    },
  };
  const props = { ...defaultProps, ...args };
  return render(
    <MemoryRouter>
      <CoursesPage {...props} />
    </MemoryRouter>
  );
}
describe("loading", () => {
  it("should show Spinner when loading is true", () => {
    renderCoursesPage({ loading: true });
    const spinner = screen.getByText("Loading...");
    expect(spinner).toBeInTheDocument();
  });
});

describe("redirect to /course when click on Add new course button", () => {
  it("should redirect to /course when click button", () => {
    renderCoursesPage({ coursesList: courses });
    expect(screen.queryByText("Add Course")).not.toBeInTheDocument(); //queryBy - useful for asserting an element that is not present; returns null
    const addNewCourseBtn = screen.getByText("Add New Course"); // getBy - throw an error if no elements match, returns the matching node
    fireEvent.click(addNewCourseBtn);
    waitFor(async () =>
      expect(screen.getByText("Add Course")).toBeInTheDocument()
    );
  });
});

// sort table
describe("sort table when click on a column", () => {
  it("should display sorted data when click on title", () => {
    renderCoursesPage({ coursesList: courses });
    const titleColumn = screen.getByText("Title");
    fireEvent.click(titleColumn);
    const sortParams = { key: "title", order: "asc" };
    const mockDispatch = jest.fn();
    waitFor(async () => setSortParams(sortParams)(mockDispatch));

    waitFor(async () =>
      expect(screen.getByTestId("title-column")).toEqual(
        "Architecting Applications for the Real World"
      )
    );
    const clearSortBtn = screen.getByTestId("clear-sign");
    fireEvent.click(clearSortBtn);
    waitFor(async () => clearSortParams()(mockDispatch));
    const expectedAction = [
      {
        type: types.SET_SORT_PARAMS,
        payload: {
          data: { key: "", order: "" },
        },
      },
    ];

    waitFor(async () =>
      expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    );
  });
});

// -------------- handleDeleteCourse
describe("handleDeleteCourse", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call deleteCourse thunk when button is clicked", async () => {
    renderCoursesPage({ coursesList: courses });
    const button = screen.getAllByText("Delete")[0];
    const course = { ...newCourse, id: 7 };
    fireEvent.click(button);
    waitFor(async () =>
      expect(screen.getByText("Course deleted!")).toBeInTheDocument()
    );
    jest
      .spyOn(courseApi, "deleteCourse")
      .mockImplementation(() => Promise.resolve(course));
    const mockDispatch = jest.fn();
    await deleteCourse(course)(mockDispatch);
    const expectedAction = [
      {
        type: types.DELETE_COURSE_OPTIMISTIC,
        course,
      },
    ];
    expect(mockDispatch.mock.calls.length).toBe(1); //get all the calls
    waitFor(async () =>
      expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    );
  });

  it("should show error if deleteCourse fails", async () => {
    renderCoursesPage({ coursesList: courses });
    const button = screen.getAllByText("Delete")[0];
    const course = { ...newCourse, id: 7 };
    fireEvent.click(button);
    waitFor(async () =>
      expect(screen.getByText("Course deleted!")).toBeInTheDocument()
    );
    jest
      .spyOn(courseApi, "deleteCourse")
      .mockImplementation(() => Promise.reject("failed"));
    const mockDispatch = jest.fn();
    await deleteCourse(course)(mockDispatch);
    waitFor(async () =>
      expect(screen.findByText(/Delete failed/).toBeInTheDocument())
    );
  });
});

// --------------- loadCourses
describe("loadCourses", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call loadCourses thunk to fetch data if courses length is 0", async () => {
    renderCoursesPage({ coursesList: [] });
    jest
      .spyOn(courseApi, "getCourses")
      .mockImplementation(() => Promise.resolve({ coursesList: courses }));
    const mockDispatch = jest.fn();
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
    renderCoursesPage({ coursesList: [] });
    jest
      .spyOn(courseApi, "getCourses")
      .mockImplementation(() => Promise.reject("fail"));
    const mockDispatch = jest.fn();
    await loadCourses()(mockDispatch);
    waitFor(async () =>
      expect(screen.findByText(/Error fetching courses/).toBeInTheDocument())
    );
  });
});

// ----------------------- loadAuthors
describe("loadAuthors", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call loadAuthors thunk to fetch data if authors length is 0", async () => {
    renderCoursesPage({ authors: [] });
    jest
      .spyOn(authorApi, "getAuthors")
      .mockImplementation(() => Promise.resolve(authors));
    const mockDispatch = jest.fn();
    // const actions = { loadAuthors: loadAuthors };
    // await actions.loadAuthors()(mockDispatch);
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
    renderCoursesPage({ authors: [] });
    jest
      .spyOn(authorApi, "getAuthors")
      .mockImplementation(() => Promise.reject("error"));
    const mockDispatch = jest.fn();
    await loadAuthors()(mockDispatch);
    waitFor(async () =>
      expect(screen.findByText(/Error fetching authors/).toBeInTheDocument())
    );
  });
});
