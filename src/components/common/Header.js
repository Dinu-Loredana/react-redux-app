import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <div className="header-container">
      <nav>
        <NavLink to="/" activeStyle={activeStyle} exact role="link">
          Home
        </NavLink>

        <NavLink to="/courses" activeStyle={activeStyle} role="link">
          Courses
        </NavLink>

        <NavLink to="/about" activeStyle={activeStyle} role="link">
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
