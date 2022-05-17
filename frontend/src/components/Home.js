import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import Navbar from "./navbars/Navbar";
import checkScreenSize from "../utilities/checkScreenSize";

function Home(props) {
  const [show, setShow] = useState(false);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    checkScreenSize(breakpoint) === "small" ? setShow(true) : setShow(false);
  }, [breakpoint]);

  return (
    <Row className="m-0 h-100">
      {show ? (
        <Navbar />
      ) : (
        <Col className="p-0 h-100" xs={12} lg={3}>
          <Navbar />
        </Col>
      )}
      <Col className="p-0 h-100" xs={12} lg={9}>
        <div className="m-2">
          <Outlet />
        </div>
      </Col>
    </Row>
  );
}

export default Home;
