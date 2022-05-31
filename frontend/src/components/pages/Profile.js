import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import ProfileEditForm from "../forms/ProfileEditForm";
import { useAuth } from "../../utilities/auth";

function Profile(props) {
  const auth = useAuth();

  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

        const { data } = await axios.get(
          `http://localhost:5000/api/user/${PhoneNumber}`,
          {
            headers: { "x-auth-token": auth.token },
          }
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
      } catch (error) {
        console.log("Error", error);
      }
    })();
  }, []);

  const handleEdit = () => {
    setDisabled(!disabled);
  };

  const handleSaveEdit = (value) => {
    console.log("Values", value);
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
