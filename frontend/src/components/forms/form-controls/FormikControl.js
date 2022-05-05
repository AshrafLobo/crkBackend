import React from "react";

import CheckBox from "./CheckBox";
import Input from "./Input";
import RadioButton from "./RadioButton";
import Select from "./Select";
import TextArea from "./TextArea";

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
