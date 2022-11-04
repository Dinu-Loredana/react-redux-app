import React from "react";
import HomePage from "./HomePage";
import AboutPage from "../about/AboutPage";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import { shallow, mount } from "enzyme";
import { MemoryRouter, Route, Switch } from "react-router-dom"; // cuz Header expects to run as a child of React Router & receives its props; not needed for shallow cuz it's not actually rendering the component

import "@testing-library/jest-dom";

describe("HomePage component", () => {
  it("should render the component", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    const h1Elem = screen.getByText("Pluralsight Administration");
    expect(h1Elem).toBeInTheDocument();
  });

  // it("should redirect to About page when button is clicked", async () => {
  //   render(
  //     <MemoryRouter initialEntries={["/"]}>
  //       <Switch>
  //         <Route exact path="/" component={HomePage} />
  //         <Route path="/about" component={AboutPage} />
  //       </Switch>
  //     </MemoryRouter>
  //   );
  //   const learnMoreButton = screen.getByText("Learn more");
  //   expect(learnMoreButton).toBeInTheDocument();

  //   fireEvent.click(learnMoreButton);

  //   const aboutPageEl = screen.getByText(
  //     /This app uses React, Redux, React Router/i
  //   );
  //   expect(aboutPageEl).toBeInTheDocument();
  //   waitFor(async () => expect(window.location.pathname).toBe("/about"));
  // });

  it("should redirect to About page when button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>
    );
    expect(window.location.pathname).toBe("/");
    fireEvent.click(screen.getByText("Learn more"));
    waitFor(async () => expect(window.location.pathname).toBe("/about"));
  });
});
