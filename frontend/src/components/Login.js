import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../utilities/auth";
import LoginForm from "./forms/LoginForm";

function Login(props) {
  const auth = useAuth();
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
      const { data } = await axios.get("http://localhost:5000/api/company/");
      data.forEach((value) => {
        opt.push({
          key: value.name,
          value: value.db,
        });
      });

      setOptions(opt);
    })();
  }, []);

  const handleLogin = (values) => {
    if (Object.keys(values).length > 0) {
      auth.login(values.phoneNo);
      navigate(redirectPath, { replace: true });
    }
  };

  return <LoginForm handleLogin={handleLogin} options={options} />;
}

export default Login;
