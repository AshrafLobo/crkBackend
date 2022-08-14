import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack, Button } from "@mui/material";

import FormikControl from "../form-controls/FormikControl";

function StepOne({ data, next, options }) {
  const validationSchema = Yup.object({
    db: Yup.string().required("Required"),
    ID_RegCert_No: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    next(values);
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <Stack spacing={3}>
            <FormikControl
              control="select"
              label="Choose a company"
              name="db"
              options={options}
            />
            <FormikControl
              control="input"
              type="text"
              label="ID Number/Passport Number"
              name="ID_RegCert_No"
            />
            <Stack direction="row-reverse">
              <Button type="submit" variant="contained">
                Next
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default StepOne;
