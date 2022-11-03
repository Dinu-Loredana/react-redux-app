import React from "react";
import PropTypes from "prop-types";

export const SortInfo = ({ sort, onSortClear }) => {
  return (
    <div className="container">
      {sort && sort.key === "" ? (
        <p className="info">Table not sorted. Sort data by column.</p>
      ) : (
        <div className="container-info ">
          <p className="info">
            Table sorted: key: {sort.key} | order: {sort.order}{" "}
          </p>
          <button
            className="btn btn-outline-primary info-clear-btn"
            onClick={() => onSortClear()}
          >
            Clear Sort
          </button>
        </div>
      )}
    </div>
  );
};

SortInfo.propTypes = {
  onSortClear: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
};
