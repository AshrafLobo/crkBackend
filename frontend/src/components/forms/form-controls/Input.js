import React from "react";
import { TextField } from "@mui/material";
import { Field } from "formik";

function Input(props) {
  const { label, name, ...rest } = props;

  return (
    <Field id={name} name={name}>
      {({ field, form }) => {
        return (
          <TextField
            {...rest}
            {...field}
            label={label}
            error={form.touched[name] && !!form.errors[name]}
            helperText={
              form.touched[name] && form.errors[name] ? form.errors[name] : null
            }
            size="small"
            fullWidth
          />
        );
      }}
    </Field>
  );
}

export default Input;
