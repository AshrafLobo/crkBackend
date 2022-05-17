import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import FormikControl from "./form-controls/FormikControl";

function LoginForm({ handleLogin }) {
  const companyOptions = [
    { key: "Select a company", value: "" },
    { key: "Comp-rite", value: 0 },
    { key: "Wpp Scangroup", value: 1 },
    { key: "Total", value: 2 },
  ];

  const initialValues = {
    company: "",
    phoneNo: "",
    pin: "",
  };

  const validationSchema = Yup.object({
    company: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Required"),
    pin: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    handleLogin(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="h-100 p-4">
            <FormikControl
              control="select"
              label="Choose a company"
              name="company"
              options={companyOptions}
            />
            <FormikControl
              control="input"
              type="text"
              label="Phone number"
              name="phoneNo"
            />
            <FormikControl
              control="input"
              type="password"
              label="Pin"
              name="pin"
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

export default LoginForm;
