import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "./FormikControl";

function FormikContainer(props) {
  const initialValues = {
    email: "",
    description: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required").email(),
    description: Yup.string().required("Required"),
  });

  const onSubmit = (values) => console.log("Form data", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <Button className="float-end" type="submit" variant="outline-primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
