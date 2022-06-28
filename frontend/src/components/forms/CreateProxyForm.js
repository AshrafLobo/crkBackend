import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function CreateProxyForm({ handleCreateProxy }) {
  const initialValues = {
    name: "",
    phoneNo: "",
    email: "",
    idNumber: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phoneNo: Yup.string()
      .matches(/^254[0-9]{9}$/, "Value should be a valid 12 digit phone number")
      .required("Required"),
    email: Yup.string().email(),
    idNumber: Yup.string()
      .matches(/^[0-9]+$/, "Value should be a valid id number")
      .required("Required"),
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
            <FormikControl
              control="input"
              type="text"
              label="Fullname"
              name="name"
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
              label="Phone Number"
              name="phoneNo"
            />
            <FormikControl
              control="input"
              type="text"
              label="ID Number"
              name="idNumber"
            />
            <Button
              className="float-end my-1"
              type="submit"
              variant="outline-primary"
              disabled={!formik.isValid}
            >
              Create proxy
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CreateProxyForm;
