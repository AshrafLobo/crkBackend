import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;

  return (
    <FormControl>
      <FormLabel id='radio-group'>
        {label}
      </FormLabel>
    <RadioGroup name='radio-group' aria-labelledby='radio-group-label'>
      <FormControlLabel control/>
    </RadioGroup>
      {/* <Field id={name} name={name} {...rest}>
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
      </Field> */}
    </FormControl>
  );
}

export default RadioButton;
