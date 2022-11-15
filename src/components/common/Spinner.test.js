import React from "react";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";
import "@testing-library/jest-dom";

describe("Spinner component", () => {
  it("should render the component", () => {
    render(<Spinner />);
    const divEl = screen.getByText("Loading...");
    expect(divEl).toBeInTheDocument();
  });
  it("should have class loader", () => {
    render(<Spinner />);
    const divEl = screen.getByText("Loading...");
    expect(divEl).toHaveClass("loader");
    // const { container } = render(<Spinner />);
    // const divEl = container.getElementsByClassName("loader");
    // expect(divEl.length).toEqual(1);
  });
});
