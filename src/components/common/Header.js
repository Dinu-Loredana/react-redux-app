import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ courses }) => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <div className="header-container">
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink>

        <NavLink to="/courses" activeStyle={activeStyle}>
          Courses
        </NavLink>

        <NavLink to="/about" activeStyle={activeStyle}>
          About
        </NavLink>
      </nav>
      {courses.length > 0 && (
        <div>
          <p>Courses: {courses?.length}</p>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}
export default connect(mapStateToProps)(Header);
