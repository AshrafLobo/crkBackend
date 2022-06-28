import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import { Code } from "./";
import FormikControl from "../form-controls/FormikControl";
import { DataProvider } from "../../../utilities";

function StepTwo({ data: currentData, next, prev }) {
  const [hasPin, setHasPin] = useState(null);
  const [isProxy, setIsProxy] = useState(null);
  const provider = new DataProvider();

  useEffect(() => {
    (async () => {
      const { data } = await provider.post("auth/checkPin", currentData);

      if (data) {
        setIsProxy(data.isProxy);
        setHasPin(data.hasPin);
      }
    })();
  }, []);

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
      initialValues={currentData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isValid }) => {
        let currentComponent = null;

        if (!hasPin && !isProxy) {
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
                onClick={() => prev(values)}
              >
                Prev
              </Button>
            </div>
          );
        }

        if (!hasPin && isProxy) {
          currentComponent = <Code prev={prev} data={currentData} />;
        }

        if (hasPin) {
          currentComponent = (
            <Form className="h-100">
              <FormikControl
                control="input"
                type="password"
                label="Pin"
                name="pin"
              />
              <Button
                className="float-start my-1"
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
          );
        }

        return currentComponent;
      }}
    </Formik>
  );
}

export default StepTwo;
