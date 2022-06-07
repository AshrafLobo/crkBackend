import { Formik, Form } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function OpenVotingForm({
  question = "Some agenda question?",
  show,
  clickHandlers: { handleClose, handleVoting },
}) {
  const initialValues = {
    answer: "",
  };

  const validationSchema = Yup.object({
    answer: Yup.string().required(),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Pin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            <Form>
              <h5>Question</h5>
              <p>{question}</p>
              <hr />
              <FormikControl
                type="textarea"
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
            </Form>;
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default OpenVotingForm;
