import { screen, render, fireEvent } from "@testing-library/react";

import React from "react";
import { SortInfo } from "./SortInfo";
import "@testing-library/jest-dom";

describe("SortInfo", () => {
  it("should not be sorted when sort params is not selected", () => {
    const sort = { key: "", order: "" };
    render(<SortInfo sort={sort} />);
    expect(
      screen.getByText("Table not sorted. Sort data by column.")
    ).toBeInTheDocument();
  });
  it("should  be sorted when sort params is selected", () => {
    const sort = { key: "title", order: "asc" };
    const onSortClear = jest.fn();
    render(<SortInfo sort={sort} onSortClear={onSortClear} />);
    expect(screen.getByText(/Table sorted:/)).toBeInTheDocument();
  });
  it("should call onSortClear when button is clicked", () => {
    const sort = { key: "title", order: "asc" };
    const onSortClear = jest.fn();
    render(<SortInfo sort={sort} onSortClear={onSortClear} />);
    const clearBtn = screen.getByRole("button");
    fireEvent.click(clearBtn);
    expect(onSortClear).toHaveBeenCalledTimes(1);
  });
});
