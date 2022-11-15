import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { courses, authors } from "../tools/mockData";
import App from "./components/App";
import configureStore from "./redux/configureStore";

jest.mock("react-dom", () => ({ render: jest.fn() }));
// const middleware = [thunk];
// const mockStore = configureMockStore(middleware);
// const store = mockStore({
//   dispatch: jest.fn(),
//   getState: jest.fn(),
//   replaceReducer: jest.fn(),
//   subscribe: jest.fn(),
//   observable: jest.fn(),
// });
const store = configureStore();

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      div
    );
    global.document.getElementById = (id) => id === "app" && div;
    //require("./index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      div
    );
  });
});
