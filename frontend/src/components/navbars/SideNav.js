import React from "react";
import { Nav } from "react-bootstrap";

import styles from "./SideNav.module.scss";
import { navigationData } from "./navigationData";
import { NavLink } from "react-router-dom";

function SideNav(props) {
  return (
    <Nav className={`flex-column h-100 p-0 ${styles.sidenav}`}>
      <div className="my-5 mx-3">
        {navigationData.map((value, key) => {
          return (
            <Nav.Link
              className="text-light"
              key={key}
              to={value.link}
              as={NavLink}
            >
              {value.title}
            </Nav.Link>
          );
        })}
      </div>
    </Nav>
  );
}

export default SideNav;
