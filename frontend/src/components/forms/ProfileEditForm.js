import React from "react";
import { Formik, Form } from "formik";
import { Stack } from "@mui/material";

import FormikControl from "./form-controls/FormikControl";

function ProfileEditForm(props) {
  /** Destructured props */
  const {
    disabled,
    user: { name = "", ID_RegCert_No = "", email = "" },
    isProxy,
  } = props;

  const initialValues = {
    name: name,
    ID_RegCert_No: ID_RegCert_No,
    email: email,
  };

  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {(formik) => {
        return (
          <Form>
            <Stack spacing={3}>
              <FormikControl
                control="input"
                type="text"
                label="Fullname"
                name="name"
                disabled={disabled}
              />

              <FormikControl
                control="input"
                type="text"
                label="Phone Number"
                name="ID_RegCert_No"
                disabled={disabled}
              />

              <FormikControl
                control="input"
                type="text"
                label="Email"
                name="email"
                disabled={disabled}
              />
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProfileEditForm;
