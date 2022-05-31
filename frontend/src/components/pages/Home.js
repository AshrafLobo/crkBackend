import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Row } from "react-bootstrap";
import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import Navbar from "../navbars/Navbar";
import checkScreenSize from "../../utilities/checkScreenSize";

function Home(props) {
  const [show, setShow] = useState(false);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    checkScreenSize(breakpoint) === "small" ? setShow(true) : setShow(false);
  }, [breakpoint]);

  return show ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <>
      <Row className="m-0">
        <div className="vh-100 col-2 p-0">
          <Navbar />
        </div>
        <div className="vh-100 col-10 p-0" style={styles.main_content}>
          <Outlet />
        </div>
      </Row>
    </>
  );
}

const styles = {
  main_content: {
    overflowY: "scroll",
  },
};

export default Home;
