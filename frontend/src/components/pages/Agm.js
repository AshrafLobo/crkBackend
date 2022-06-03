import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import DataProvider from "../../utilities/DataProvider";
import { useAuth } from "../../utilities/auth";
import { Agendas, Downloads } from "../reusable";

function Agm(props) {
  const auth = useAuth();
  const provider = new DataProvider();

  const [agendas, setAgendas] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await provider.get("agenda", {
        "x-auth-token": auth.token,
      });
      setAgendas(data);
    })();
  }, []);

  const [downloads, setDownloads] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await provider.get("downloads", {
        "x-auth-token": auth.token,
      });
      setDownloads(data);
    })();
  }, []);

  return (
    <>
      <Row className="m-3">
        <Col xs={12} lg={6} className="my-2">
          <Agendas agendas={agendas} />
        </Col>

        <Col xs={12} lg={6} className="my-2">
          <Downloads downloads={downloads} />
        </Col>
      </Row>
    </>
  );
}

export default Agm;
