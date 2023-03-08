import React from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import { formatPhoneNumberIntl } from "react-phone-number-input";

export const PhoneNumber = ({ name = "phone_number", control, rules }) => {
  const [value, setValue] = useState();

  formatPhoneNumberIntl("+4512345678") === "+45 12 34 56 78";
  const phoneNumber = parsePhoneNumber("+4512345678");
  if (phoneNumber) {
    phoneNumber.country === "Denmark";
  }
  return (
    // `value` will be the parsed phone number in E.164 format. // Example:
    // Example: "+12133734253".

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