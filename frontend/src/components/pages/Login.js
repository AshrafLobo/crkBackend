import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../utilities/auth";
import DataProvider from "../../utilities/DataProvider";
import LoginForm from "../forms/LoginForm";

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
      const provider = new DataProvider();
      const { data } = await provider.get("company");

      data.forEach((value) => {
        opt.push({
          key: value.name,
          value: value.db,
        });
      });

      setOptions(opt);
    })();
  }, []);

  const handleLogin = async (values, setError) => {
    if (Object.keys(values).length > 0) {
      const { status, data } = await auth.login(values);

      if (status === 400) {
        setError({
          phoneNo: data,
          pin: data,
        });
      } else {
        navigate(redirectPath, { replace: true });
      }
    }
  };

  return <LoginForm handleLogin={handleLogin} options={options} />;
}

export default Login;
