import React from "react";
import { useState } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

export const PhoneNumber = ({ name = "phone_number", control, rules }) => {
  const [value, setValue] = useState();

  return (
    <PhoneInputWithCountry
      name={name}
      placeholder="Ex. +4512345678"
      value={value}
      onChange={setValue}
      defaultCountry="DK"
      control={control}
      rules={rules}
    />
  );
};