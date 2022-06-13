import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label className="d-block" htmlFor={name}>
        {label}
      </Form.Label>
      <Field id={name} name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <Form.Check.Input
                  type="radio"
                  className="me-1"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <Form.Check.Label htmlFor={option.value} className="me-2">
                  {option.key}
                </Form.Check.Label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage
        className="d-block text-danger"
        name={name}
        component={Form.Text}
      />
    </Form.Group>
  );
}

export default RadioButton;
