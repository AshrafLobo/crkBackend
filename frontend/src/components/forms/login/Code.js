import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import FormikControl from "../form-controls/FormikControl";
import { DataProvider } from "../../../utilities";

function Code({ data: { phoneNo, db }, prev }) {
  const provider = new DataProvider();
  const [validated, setValidated] = useState(false);

  const initialValues = {
    phoneNo,
    db,
    code: "",
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .matches(/^[0-9A-Z]{4}$/, "Value should be a valid 4 digit code")
      .required("Required"),
  });

  const onSubmit = async (values, { setErrors }) => {
    const { status, data } = await provider.post("proxy/validate", values);

    if (status === 400) {
      /** Set a formik error */
      setErrors({
        phoneNo: data,
        code: data,
      });

      return;
    }

    setValidated(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid }) => {
        let currentComponent = (
          <Form className="h-100">
            <FormikControl
              control="input"
              type="password"
              label="Please enter code"
              name="code"
            />
            <Button
              className="float-start my-1"
              type="button"
              variant="outline-primary"
              onClick={() => prev()}
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
        );

        if (validated) {
          currentComponent = (
            <div>
              <h5 className="text-center">First time login</h5>
              <p className="text-center">
                Login details have been sent to your email
              </p>
              <Button
                className="float-end my-1"
                type="button"
                variant="outline-primary"
                onClick={() => prev()}
              >
                Prev
              </Button>
            </div>
          );
        }

        return currentComponent;
      }}
    </Formik>
  );
}

export default Code;
