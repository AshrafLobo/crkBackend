import React from "react";
import { Formik, Form } from "formik";
import { Stack, Button } from "@mui/material";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function CreateProxyForm({ handleCreateProxy }) {
  const initialValues = {
    full_name: "",
    email: "",
    ID_RegCert_No: "",
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    ID_RegCert_No: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    handleCreateProxy(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Stack spacing={3} p={5}>
              <FormikControl
                control="input"
                type="text"
                label="Fullname"
                name="full_name"
              />

              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
              />

              <FormikControl
                control="input"
                type="text"
                label="ID Number/ Passport Number"
                name="ID_RegCert_No"
              />

              <Button
                type="submit"
                variant="contained"
                disabled={!formik.isValid}
              >
                Create proxy
              </Button>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateProxyForm;
