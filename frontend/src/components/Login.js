import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utilities/auth";

import LoginForm from "./forms/LoginForm";

function Login(props) {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = location.state?.path || "/";

  const handleLogin = (values) => {
    if (Object.keys(values).length > 0) {
      auth.login(values.phoneNo);
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <Container className="h-100">
      <LoginForm handleLogin={handleLogin} />
    </Container>
  );
}

export default Login;
