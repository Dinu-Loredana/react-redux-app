import React from "react";
import PageNotFound from "./PageNotFound";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("testing PageNotFound", () => {
  it("should go to 404 page", () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <PageNotFound />
      </MemoryRouter>
    );

    const text = screen.getByText("Oops! Page not found.");
    expect(text).toBeInTheDocument();
  });
});
