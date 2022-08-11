import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Field } from "formik";

function Select(props) {
  const { label, name, options, ...rest } = props;

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
            select
            size="small"
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    </Field>
  );
}

export default Select;
