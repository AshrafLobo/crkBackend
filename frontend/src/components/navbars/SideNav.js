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
    <Nav className={`flex-column vh-100 p-0 ${styles.sidenav}`}>
      <div className="my-5">
        {navigationData.map((value, key) => {
          return (
            <Nav.Link
              className="text-light p-1"
              key={key}
              to={value.link}
              as={NavLink}
            >
              <i
                className={`bi ${value.icon} me-1`}
                style={{ fontSize: 12 }}
              ></i>
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
