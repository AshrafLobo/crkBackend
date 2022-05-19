import React from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./SideNav.module.scss";
import { navigationData } from "./navigationData";
import { useAuth } from "../../utilities/auth";

function SideNav(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (values) => {
    await auth.logout();
    navigate("login", { replace: true });
  };

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

        <Button
          className="float-end my-1 w-100"
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Nav>
  );
}

export default SideNav;
