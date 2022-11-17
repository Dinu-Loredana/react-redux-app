import React from "react";
import { CoursesPage } from "./CoursesPage";
import { courses, authors } from "../../../tools/mockData";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as courseApi from "../../api/courseApi";
import * as authorApi from "../../api/authorApi";
import { loadCourses } from "../../redux/actions/courseActions";
import * as types from "../../redux/actions/actionTypes";
import "@testing-library/jest-dom";
import { loadAuthors } from "../../redux/actions/authorActions";

function renderCoursesPage(args) {
  const defaultProps = {
    authors,
    coursesList: courses,
    loading: false,
    sortParams: { key: "title", order: "asc" },
    history: {}, // alternative to MemoryRouter
    match: {},
    loadCourses: () => {
      return Promise.reject(new Error("fail"));
    },
    actions: {
      loadAuthors: () => {
        return Promise.reject(new Error("error"));
      },
      deleteCourse: () => {},
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
