import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import FormikControl from "../form-controls/FormikControl";

function StepTwo({ data, next, prev }) {
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
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid }) => (
        <Form className="h-100">
          <FormikControl
            control="input"
            type="password"
            label="Pin"
            name="pin"
          />
          <Button
            className="float-stary my-1"
            type="button"
            variant="outline-primary"
            onClick={() => prev(values)}
          >
            Prev
          </Button>
          <Button
            className="float-end my-1"
            type="submit"
            variant="outline-primary"
            disabled={!isValid}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default StepTwo;
