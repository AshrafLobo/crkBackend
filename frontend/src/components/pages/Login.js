import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth, DataProvider } from "../../utilities";
import { LoginForm } from "../forms/login";

function Login(props) {
  /** Authentication */
  const auth = useAuth();

  /** Navigation */
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath = location.state?.path || "/";

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const opt = [
      {
        key: "Select a company",
        value: "",
      },
    ];

    (async () => {
      /** Fetch all company names */
      const provider = new DataProvider();
      const { data } = await provider.get("company");

      /** Push company names to opt */
      data.forEach((value) => {
        opt.push({
          key: value.name,
          value: value.db,
        });
      });

      /** Set the options state */
      setOptions(opt);
    })();
  }, []);

  const handleLogin = async (values, setErrors) => {
    /** Check if login values are set */
    if (Object.keys(values).length > 0) {
      const { status, data } = await auth.login(values);

      /** If incorrect values submitted */
      if (status === 400) {
        /** Set a formik error */
        setErrors({
          phoneNo: data,
          pin: data,
        });
      } else {
        /** Navigate to previous route */
        navigate(redirectPath, { replace: true });
      }
    }
  };

  return (
    <Container className="vh-100 row mx-auto p-0">
      <Col
        xs={11}
        lg={6}
        className="mx-auto p-4 py-md-2 py-lg-4 align-self-center border border-1 rounded"
      >
        <h2>Login</h2>
        <hr />
        <LoginForm handleLogin={handleLogin} options={options} />
      </Col>
    </Container>
  );
}

export default Login;
