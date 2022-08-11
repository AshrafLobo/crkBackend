import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";
import { Button } from "react-bootstrap";

import FormikControl from "../form-controls/FormikControl";

function StepOne({ data, next, options }) {
  const validationSchema = Yup.object({
    db: Yup.string().required("Required"),
    phoneNo: Yup.string()
      .matches(/^254[0-9]{9}$/, "Value should be a valid 12 digit phone number")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    next(values);
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="h-100">
          <Stack spacing={1}>
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
            <Button
              className="float-end"
              type="submit"
              variant="outline-primary"
            >
              Next
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default StepOne;
