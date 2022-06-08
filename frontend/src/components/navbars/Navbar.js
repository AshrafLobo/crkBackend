import React, { useEffect, useState } from "react";
import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import SideNav from "./SideNav";
import OffCanvas from "./OffCanvas";
import { checkScreenSize } from "../../utilities";

function Navbar(props) {
  const [nav, setNav] = useState(null);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    checkScreenSize(breakpoint) === "small"
      ? setNav(<OffCanvas />)
      : setNav(<SideNav />);
  }, [breakpoint]);

  return nav;
}

export default Navbar;
