import { Formik, Form } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function OpenVotingForm({ question, handleVoting }) {
  const initialValues = {
    answer: "",
  };

  const validationSchema = Yup.object({
    answer: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    handleVoting(values);
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
            <h5>Question</h5>
            <p style={{ color: "gray", fontSize: "12pt" }}>{question}</p>
            <FormikControl
              control="textarea"
              label="Enter your answer here"
              name="answer"
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

export default OpenVotingForm;
