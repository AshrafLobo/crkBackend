import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Card, Row } from "react-bootstrap";

import { useAuth, DataProvider } from "../../utilities";
import { Modal } from "../reusable";
import { ChangePinForm, ProfileEditForm } from "../forms";

function Profile(props) {
  /** Authentication */
  const auth = useAuth();
  const provider = new DataProvider();
  const { phoneNo: PhoneNumber, isProxy } = jwt_decode(auth.token);

  /**Change pin modal */
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  /** Set user data */
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      let url = "user";

      if (isProxy) url = "proxy";

      /** Get user data */
      const { data } = await provider.get(
        url,
        {
          "x-auth-token": auth.token,
        },
        PhoneNumber
      );

      /** Initialize data */
      let {
        full_name = "N/A",
        phoneNo = "N/A",
        PaymentName = null,
        email = "N/A",
      } = data;

      /** If Payment name is not set */
      if (!PaymentName) PaymentName = "";

      /** Set user state */
      setUser({
        name: full_name,
        phoneNo: phoneNo,
        paymentMethod: PaymentName,
        email: email,
      });
    })();
  }, []);

  /** Edit user data */
  const handleEdit = () => {
    setDisabled(!disabled);
  };

  /** Update editted data */
  const handleSaveEdit = async (values) => {
    setDisabled(true);

    let url = "user";
    if (isProxy) url = "proxy";

    await provider.update(
      url,
      values,
      {
        "x-auth-token": auth.token,
      },
      PhoneNumber
    );
  };

  /** Handle change pin clicked */
  const handleChangePin = async (values) => {
    setShow(false);

    let url = "user";

    if (isProxy) url = "proxy";

    await provider.update(
      `${url}/changePin`,
      values,
      {
        "x-auth-token": auth.token,
      },
      PhoneNumber
    );
  };

  return (
    <>
      <Card>
        <Card.Header className="row m-0">
          <h5 className="col-xs-12 col-lg-6">User Details</h5>
          <Row className="col-xs-12 col-lg-6 m-0">
            <button className="col" onClick={() => setShow(!show)}>
              <i className="bi bi-lock-fill me-1"></i>
              Change Pin
            </button>
            <button className="col" onClick={handleEdit}>
              <i className="bi bi-pencil-square me-1"></i>
              Edit
            </button>
          </Row>
        </Card.Header>
        <Card.Body>
          <ProfileEditForm
            disabled={disabled}
            user={user}
            handleSaveEdit={handleSaveEdit}
            isProxy={isProxy}
          />
        </Card.Body>
      </Card>

      <Modal show={show} setShow={setShow} title="Change pin">
        <ChangePinForm handleChangePin={handleChangePin} />
      </Modal>
    </>
  );
}

export default Profile;
