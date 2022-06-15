import React, { useState } from "react";

import { StepOne, StepTwo } from "./";

function LoginForm({ handleLogin, options }) {
  const [data, setData] = useState({
    db: "",
    phoneNo: "",
    pin: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData, final = false, setErrors = null) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      handleSubmit(newData, setErrors);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData = {}) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} options={options} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  const handleSubmit = (values, setErrors) => {
    handleLogin(values, setErrors);
  };

  return <>{steps[currentStep]}</>;
}

export default LoginForm;
