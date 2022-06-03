import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import ProfileEditForm from "../forms/ProfileEditForm";
import { useAuth } from "../../utilities/auth";
import DataProvider from "../../utilities/DataProvider";
import ChangePinForm from "../forms/ChangePinForm";

function Profile(props) {
  const auth = useAuth();
  const provider = new DataProvider();
  const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await provider.get(
        "user",
        {
          "x-auth-token": auth.token,
        },
        PhoneNumber
      );

      let {
        full_name = "N/A",
        phoneNo = "N/A",
        PaymentName = null,
        email = "N/A",
      } = data;

      if (!PaymentName) PaymentName = "Cheque";

      setUser({
        name: full_name,
        phoneNo: phoneNo,
        paymentMethod: PaymentName,
        email: email,
      });
    })();
  }, []);

  const handleEdit = () => {
    setDisabled(!disabled);
  };

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

  const handleShow = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <ProfileEditForm
        disabled={disabled}
        user={user}
        clickHandlers={{ handleEdit, handleSaveEdit, handleShow }}
      />
      <ChangePinForm
        show={show}
        clickHandlers={{ handleClose, handleChangePin }}
      />
    </>
  );
}

export default Profile;
