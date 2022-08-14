import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
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
          ID_RegCert_No: data,
          pin: data,
        });
      } else {
        /** Navigate to previous route */
        navigate(redirectPath, { replace: true });
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignContent="center" my={10}>
      <Grid
        item
        xs={11}
        md={6}
        p={6}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Please fill in the details bellow
        </Typography>
        <Box my={4}>
          <Divider light />
        </Box>
        <LoginForm handleLogin={handleLogin} options={options} />
      </Grid>
    </Grid>
  );
}

export default Login;
