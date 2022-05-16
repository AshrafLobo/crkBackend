import React from "react";
import { useAuth } from "../utilities/auth";

function Profile(props) {
  const auth = useAuth();

  return <div>Welcome to your profile {auth.user}</div>;
}

export default Profile;
