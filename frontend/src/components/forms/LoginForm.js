import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Col, Container } from "react-bootstrap";

import FormikControl from "./form-controls/FormikControl";

function LoginForm({ handleLogin, options }) {
  const initialValues = {
    db: "",
    phoneNo: "",
    pin: "",
  };

  const validationSchema = Yup.object({
    db: Yup.string().required("Required"),
    phoneNo: Yup.string()
      .matches(/^254[0-9]{9}$/, "Value should be a valid 12 digit phone number")
      .required("Required"),
    pin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
  });

  const onSubmit = (values, { setErrors }) => {
    handleLogin(values, setErrors);
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className="h-100">
                <FormikControl
                  control="select"
                  label="Choose a company"
                  name="db"
                  options={options}
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
      </Col>
    </Container>
  );
}

export default LoginForm;