import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import FormikControl from "./form-controls/FormikControl";

function ProfileEditForm(props) {
  /** Destructured props */
  const {
    disabled,
    user: { name = "", phoneNo = "", paymentMethod = "", email = "" },
    handleSaveEdit,
    isProxy,
  } = props;

  /** Select options */
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
    paymentMethod: Yup.string().oneOf(["Cheque", "Mpesa"]),
  });

  const onSubmit = (values) => {
    if (isProxy) delete values["paymentMethod"];
    handleSaveEdit(values);
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
            {!isProxy && (
              <FormikControl
                control="select"
                label="Payment method"
                name="paymentMethod"
                disabled={disabled}
                options={options}
              />
            )}

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
  );
}

export default ProfileEditForm;
