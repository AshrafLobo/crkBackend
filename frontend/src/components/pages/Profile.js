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
  const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

  /**Change pin modal */
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  /** Set user data */
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      /** Get user data */
      const { data } = await provider.get(
        "user",
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
  const handleSaveEdit = async (value) => {
    await provider.update(
      "user",
      value,
      {
        "x-auth-token": auth.token,
      },
      PhoneNumber
    );
    setDisabled(true);
  };

  /** Handle change pin clicked */
  const handleChangePin = async (value) => {
    await provider.update(
      "user/changePin",
      value,
      {
        "x-auth-token": auth.token,
      },
      PhoneNumber
    );
    setShow(false);
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
