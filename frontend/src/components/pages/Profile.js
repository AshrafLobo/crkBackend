import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import ProfileEditForm from "../forms/ProfileEditForm";
import { useAuth } from "../../utilities/auth";
import DataProvider from "../../utilities/DataProvider";

function Profile(props) {
  const auth = useAuth();
  const provider = new DataProvider();
  const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await provider.get("user", PhoneNumber, {
        "x-auth-token": auth.token,
      });

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
    await provider.update("user", value, PhoneNumber, {
      "x-auth-token": auth.token,
    });
    setDisabled(true);
  };

  const handleChangePin = () => {
    console.log("Changing pin");
  };

  return (
    <ProfileEditForm
      disabled={disabled}
      user={user}
      clickHandlers={{ handleEdit, handleSaveEdit, handleChangePin }}
    />
  );
}

export default Profile;
