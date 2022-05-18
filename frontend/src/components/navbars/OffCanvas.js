import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import useBreakpoint from "bootstrap-5-breakpoint-react-hook";

import { navigationData } from "./navigationData";
import checkScreenSize from "../../utilities/checkScreenSize";

import styles from "./OffCanvas.module.scss";

function OffCanvas(props) {
  const [offCanvasSize, setOffCanvasSize] = useState("w-50");
  const breakpoint = useBreakpoint();

  useEffect(() => {
    checkScreenSize(breakpoint, ["xs"], ["sm", "md"]) === "small"
      ? setOffCanvasSize("w-75")
      : setOffCanvasSize("w-50");
  }, [breakpoint]);

  return (
    <>
      <Navbar key={false} bg="light" expand={false} className="mx-0 px-0">
        <Container fluid>
          <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
            className={`${offCanvasSize} ${styles.offcanvas}`}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {navigationData.map((value, key) => {
                  return (
                    <Nav.Link className="text-light" key={key}>
                      {value.title}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffCanvas;
