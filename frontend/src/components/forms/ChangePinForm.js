import { Formik, Form } from "formik";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function ChangePinForm({
  show,
  clickHandlers: { handleClose, handleChangePin },
}) {
  const initialValues = {
    oldPin: "",
    newPin: "",
    confirmPin: "",
  };

  const validationSchema = Yup.object({
    oldPin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
    newPin: Yup.string()
      .matches(/^[0-9]{4}$/, "Value should be a valid 4 digit pin")
      .required("Required"),
    confirmPin: Yup.string()
      .oneOf([Yup.ref("newPin"), null], "Pins must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    handleChangePin(values);
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
            return (
              <Form>
                <FormikControl
                  control="input"
                  type="password"
                  label="Enter Old Pin"
                  name="oldPin"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Enter New Pin"
                  name="newPin"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Confirm Pin"
                  name="confirmPin"
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
      </Modal.Body>
    </Modal>
  );
}

export default ChangePinForm;
