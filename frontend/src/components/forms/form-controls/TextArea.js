import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

function TextArea(props) {
  const { label, name, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Field
        id={name}
        name={name}
        as="textarea"
        className="form-control"
        rows={5}
        {...rest}
      />
      <ErrorMessage className="text-danger" name={name} component={Form.Text} />
    </Form.Group>
  );
}

export default TextArea;