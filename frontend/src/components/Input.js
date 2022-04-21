import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

function Input(props) {
  const { label, name, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Field id={name} name={name} {...rest} as={Form.Control} />
      <ErrorMessage className="text-danger" name={name} component={Form.Text} />
    </Form.Group>
  );
}

export default Input;
