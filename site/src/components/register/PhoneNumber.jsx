import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import { formatPhoneNumberIntl } from "react-phone-number-input";

const PhoneNumber = () => {
  const [value, setValue] = useState();

  formatPhoneNumberIntl("+4512345678") === "+45 12 34 56 78";
  const phoneNumber = parsePhoneNumber("+4512345678");
  if (phoneNumber) {
    phoneNumber.country === "Denmark";
  }
  return (
    // `value` will be the parsed phone number in E.164 format. // Example:
    // Example: "+12133734253".

    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}
      defaultCountry="DK"
    />
  );
};
export default PhoneNumber;
