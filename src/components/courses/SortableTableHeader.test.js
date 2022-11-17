import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import React from "react";
import { SortableTableHeader } from "./SortableTableHeader";

describe("SortableTableHeader", () => {
  const label = "Title";
  const onSort = jest.fn();
  const onSortClear = jest.fn();
  const sort = { key: "title", orde: "asc" };
  const sortKey = "title";
  it("should call onSort when a column is clicked", async () => {
    render(
      <SortableTableHeader
        label={label}
        onSort={onSort}
        onSortClear={onSortClear}
        sort={sort}
        sortKey={sortKey}
      />
    );
    const titleColumn = screen.getByText("Title");
    fireEvent.click(titleColumn);
    expect(onSort).toHaveBeenCalledWith(sortKey);
    const clearSign = await screen.findByTestId("clear-sign");
    fireEvent.click(clearSign);
    expect(onSortClear).toHaveBeenCalledTimes(1);
  });
});
