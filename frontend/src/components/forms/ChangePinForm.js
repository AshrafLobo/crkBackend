import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function ChangePinForm({ handleChangePin }) {
  const initialValues = {
    oldPin: "",
    newPin: "",
    confirmPin: "",
  };

  const validationSchema = Yup.object({
    oldPin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
    newPin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref("newPin"), null], "Pins must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    handleChangePin(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="password"
              label="Enter Old Pin"
              name="oldPin"
            />
            <FormikControl
              control="input"
              type="password"
              label="Enter New Pin"
              name="newPin"
            />
            <FormikControl
              control="input"
              type="password"
              label="Confirm Pin"
              name="confirmPin"
            />
            <Button
              className="float-end my-1"
              type="submit"
              variant="outline-primary"
              disabled={!formik.isValid}
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ChangePinForm;
