import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Typography, Stack } from "@mui/material";

import { Code } from "./";
import FormikControl from "../form-controls/FormikControl";
import { DataProvider } from "../../../utilities";

function StepTwo({ data: currentData, next, prev }) {
  const [hasPin, setHasPin] = useState(null);
  const [isProxy, setIsProxy] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);

  const provider = new DataProvider();

  useEffect(() => {
    (async () => {
      const { db, ID_RegCert_No } = currentData;

      const { data } = await provider.post("auth/checkPin", {
        db,
        ID_RegCert_No,
      });

      if (data) {
        setIsProxy(data.isProxy);
        setHasPin(data.hasPin);
        setFetchingData(false);
      }
    })();
  }, []);

  const validationSchema = Yup.object({
    pin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
  });

  const onSubmit = (values, { setErrors }) => {
    next(values, true, setErrors);
  };

  return (
    <Formik
      initialValues={currentData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid }) => {
        let currentComponent = null;

        if (!fetchingData && !hasPin && !isProxy) {
          currentComponent = (
            <Box>
              <Typography variant="h6" textAlign="center">
                First time login
              </Typography>
              <Typography variant="body1" textAlign="center" mb={4}>
                Login details have been sent to your email
              </Typography>
              <Button
                type="button"
                variant="contained"
                onClick={() => prev(values)}
              >
                Prev
              </Button>
            </Box>
          );
        }

        if (!fetchingData && !hasPin && isProxy) {
          currentComponent = <Code prev={prev} data={currentData} />;
        }

        if (!fetchingData && hasPin) {
          currentComponent = (
            <Form>
              <FormikControl
                control="input"
                type="password"
                label="Pin"
                name="pin"
              />
              <Stack direction="row" justifyContent="space-between" my={3}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => prev(values)}
                >
                  Prev
                </Button>
                <Button type="submit" variant="contained" disabled={!isValid}>
                  Submit
                </Button>
              </Stack>
            </Form>
          );
        }

        return currentComponent;
      }}
    </Formik>
  );
}

export default StepTwo;
