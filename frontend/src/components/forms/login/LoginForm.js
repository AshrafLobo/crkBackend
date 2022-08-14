import React, { useState } from "react";

import { StepOne, StepTwo } from "./";

function LoginForm({ handleLogin, options }) {
  const [data, setData] = useState({
    db: "",
    ID_RegCert_No: "",
    pin: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData, final = false, setErrors = null) => {
    setData((prevData) => ({ ...prevData, ...newData }));

    if (final) {
      handleSubmit(newData, setErrors);
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = (newData = {}) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    setCurrentStep((prevStep) => prevStep - 1);
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
