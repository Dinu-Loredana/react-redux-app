import { render, screen } from "@testing-library/react"; // check if there is a way to visit a route with this-no
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";
import { courses, authors } from "../../tools/mockData";
import configureMockStore from "redux-mock-store"; // mock redux store
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import configureStore from "../redux/configureStore";

const routesToBeTested = [
  {
    route: "/",
    textToBeValidated: /React, Redux and React Router/,
  },
  {
    route: "/about",
    textToBeValidated: /This app uses React, Redux, React Router, and many/,
  },
  {
    route: "/courses",
    textToBeValidated: "Add New Course",
  },
  {
    route: "/course",
    textToBeValidated: "Add Course",
  },
  {
    route: "/course/test-slug",
    textToBeValidated: "Add Course",
  },
  {
    route: "/some/bad/route",
    textToBeValidated: /Oops! Page not found./,
  },
];

// mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  courses,
  authors,
  sortParams: { key: "title", order: "desc" },
});

// const store = configureStore();

describe("app rendering/navigating", () => {
  routesToBeTested.forEach((el) => {
    it("test route to be rendered ", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[el.route]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByText(el.textToBeValidated)).toBeInTheDocument();
    });
  });
});

// connected to store
// it("test ManageCoursePage", () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={["/course"]}>
//         <App />
//       </MemoryRouter>
//     </Provider>
//   );
//   waitFor(async () => expect(screen.getByText("Add Course")).toBeInTheDocument);
// });
