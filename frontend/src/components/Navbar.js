import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline",
      marginRight: "16px",
    };
  };

  return (
    <nav style={style.nav}>
      <NavLink style={navLinkStyles} to="/">
        Home
      </NavLink>
      <NavLink style={navLinkStyles} to="/profile">
        Profile
      </NavLink>
    </nav>
  );
}

const style = {
  nav: {
    backgroundColor: "aliceblue",
    padding: "16px 32px",
  },
};

export default Navbar;
