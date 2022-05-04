import React from "react";
import DateView from "react-datepicker";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";

import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props) {
  const { label, name, ...rest } = props;

  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <DateView
              id={name}
              className="w-100"
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage className="text-danger" name={name} component={Form.Text} />
    </Form.Group>
  );
}

export default DatePicker;
