import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

function Select(props) {
  const { label, name, options, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Field id={name} name={name} {...rest} as={Form.Select}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage className="text-danger" name={name} component={Form.Text} />
    </Form.Group>
  );
}

export default Select;
