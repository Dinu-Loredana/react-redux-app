import React from "react";
import PropTypes from "prop-types";

export const SortableTableHeader = ({
  onSort,
  onSortClear,
  sort,
  label,
  sortKey,
}) => {
  return (
    <th>
      <span
        style={{ cursor: "pointer", display: "inline-block" }}
        onClick={() => onSort(sortKey)}
      >
        {label}
      </span>
      {sort && sort.key !== "" && sort.key === sortKey && (
        <span
          style={{
            cursor: "pointer",
            display: "inline-block",
            marginLeft: "20px",
          }}
          onClick={() => {
            onSortClear();
          }}
        >
          &times;
        </span>
      )}
    </th>
  );
};

SortableTableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  onSortClear: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
};
