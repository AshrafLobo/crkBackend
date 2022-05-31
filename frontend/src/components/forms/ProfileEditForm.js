import { Formik, Form } from "formik";
import React from "react";
import { Button, Card, Row } from "react-bootstrap";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function ProfileEditForm(props) {
  const {
    disabled,
    user: { name = "", phoneNo = "", paymentMethod = "Cheque", email = "" },
    clickHandlers: { handleEdit, handleChangePin, handleSaveEdit },
  } = props;

  const initialValues = {
    name: name,
    phoneNo: phoneNo,
    paymentMethod: paymentMethod,
    email: email,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    phoneNo: Yup.string()
      .matches(/^254[0-9]{9}$/, "Value should be a valid 12 digit phone number")
      .required("Required"),
    email: Yup.string().email(),
    paymentMethod: Yup.string().oneOf(["Cheque", "Mpesa"]).required(),
  });

  const onSubmit = (values) => {
    handleSaveEdit(values);
  };

  const options = [
    {
      key: "Select a payment method",
      value: "",
    },
    {
      key: "Cheque",
      value: "Cheque",
    },
    {
      key: "Mpesa",
      value: "Mpesa",
    },
  ];

  return (
    <>
      <Card className="m-3">
        <Card.Header className="row m-0">
          <h5 className="col-xs-12 col-lg-6">User Details</h5>
          <Row className="col-xs-12 col-lg-6 m-0">
            <button className="col" onClick={handleChangePin}>
              <i className="bi bi-lock-fill me-1"></i>
              Change Pin
            </button>
            <button className="col" onClick={handleEdit}>
              <i className="bi bi-pencil-square me-1"></i>
              Edit
            </button>
          </Row>
        </Card.Header>
        <Card.Body>
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
                    disabled={disabled}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Phone number"
                    name="phoneNo"
                    disabled={disabled}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label="Email"
                    name="email"
                    disabled={disabled}
                  />
                  <FormikControl
                    control="select"
                    label="Payment method"
                    name="paymentMethod"
                    disabled={disabled}
                    options={options}
                  />

                  {!disabled && (
                    <Button
                      className="float-end my-1"
                      type="submit"
                      variant="outline-primary"
                      disabled={!formik.isValid}
                    >
                      Save Edits
                    </Button>
                  )}
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileEditForm;
