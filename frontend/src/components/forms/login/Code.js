import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, Button, Box, Typography } from "@mui/material";

import FormikControl from "../form-controls/FormikControl";
import { DataProvider } from "../../../utilities";

function Code({ data: { ID_RegCert_No, db }, prev }) {
  const provider = new DataProvider();
  const [validated, setValidated] = useState(false);

  const initialValues = {
    ID_RegCert_No,
    db,
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .matches(/^[0-9A-Z]{4}$/, "Value should be a valid 4 digit code")
      .required("Required"),
  });

  const onSubmit = async (values, { setErrors }) => {
    const { status, data } = await provider.post("proxy/validate", values);

    if (status === 400) {
      /** Set a formik error */
      setErrors({
        ID_RegCert_No: data,
        code: data,
      });

      return;
    }

    setValidated(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => {
        let currentComponent = (
          <Form>
            <Stack spacing={3}>
              <FormikControl
                control="input"
                type="password"
                label="Please enter code"
                name="code"
              />

              <Stack direction="row" justifyContent="space-between">
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => prev()}
                >
                  Prev
                </Button>
                <Button type="submit" variant="contained" disabled={!isValid}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        );

        if (validated) {
          currentComponent = (
            <Box>
              <Typography variant="h6" textAlign="center">
                Successfully validated
              </Typography>
              <Typography variant="body1" textAlign="center" mb={4}>
                Login details have been sent to your email
              </Typography>
              <Button type="button" variant="contained" onClick={() => prev()}>
                Prev
              </Button>
            </Box>
          );
        }

        return currentComponent;
      }}
    </Formik>
  );
}

export default Code;
