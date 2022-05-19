import React, { useEffect, useState } from "react";
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

  return show ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <>
      <div className="h-100" style={styles.sidenav}>
        <Navbar />
      </div>
      <div style={styles.main_content}>
        <Outlet />
      </div>
    </>
  );
}

const sidenavWidth = "20%";
const styles = {
  sidenav: {
    width: sidenavWidth,
    position: "fixed",
  },
  main_content: {
    width: "80%",
    marginLeft: sidenavWidth,
  },
};

export default Home;
