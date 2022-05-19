import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Col, Container } from "react-bootstrap";

import FormikControl from "./form-controls/FormikControl";

function LoginForm({ handleLogin, options }) {
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
                  name="company"
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
