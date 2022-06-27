import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";

import { useAuth, DataProvider } from "../../utilities";
import { CreateProxyForm } from "../forms";
import { Agendas, Resources, Modal } from "../reusable";

function Agm(props) {
  const auth = useAuth();
  const provider = new DataProvider();
  const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

  const [show, setShow] = useState(false);
  const handleCreateProxy = async (values) => {
    setShow(false);

    const { name: full_name, phoneNo, email, idNumber: ID_RegCert_No } = values;
    /** Get user data */
    const {
      data: { MemberNo: users_MemberNo },
    } = await provider.get(`user/${PhoneNumber}`, {
      "x-auth-token": auth.token,
    });

    /** Create payload */
    const payload = {
      users_MemberNo,
      full_name,
      phoneNo,
      email,
      ID_RegCert_No,
    };

    await provider.post("proxy", payload, {
      "x-auth-token": auth.token,
    });
  };

  const [agendas, setAgendas] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await provider.get("agenda", {
        "x-auth-token": auth.token,
      });
      setAgendas(data);
    })();
  }, []);

  const [resources, setResources] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await provider.get("resources", {
        "x-auth-token": auth.token,
      });
      setResources(data);
    })();
  }, []);

  return (
    <>
      <Row className="m-4">
        <button
          className="col-12 col-md-4 offset-md-8 p-0"
          onClick={() => setShow(true)}
        >
          Create proxy
        </button>
      </Row>

      <Row className="m-3">
        <Col xs={12} lg={6} className="my-2">
          <Agendas agendas={agendas} />
        </Col>

        <Col xs={12} lg={6} className="my-2">
          <Resources resources={resources} />
        </Col>
      </Row>

      <Modal show={show} setShow={setShow} title="Create proxy">
        <CreateProxyForm handleCreateProxy={handleCreateProxy} />
      </Modal>
    </>
  );
}

export default Agm;
