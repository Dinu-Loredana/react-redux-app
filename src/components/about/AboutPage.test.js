import React from "react";
import AboutPage from "./AboutPage";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("AboutPage component", () => {
  it("should render the component", () => {
    render(<AboutPage />);
    const text = screen.getByText(/This app uses React, Redux, React Router/i);
    expect(text).toBeInTheDocument();
    waitFor(async () => expect(window.location.pathname).toBe("/about"));
  });
});
