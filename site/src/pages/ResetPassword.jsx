import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"
import PhoneNumber from "react-phone-number-input";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitPhoneNumber = async (e) => {
    e.preventDefault(); // prevent form from refreshing page on submit

    try {
      const response = await fetch(API_URL + `/auth/reset-password/request`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phoneNumber,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(response.statusText);
        navigate(`/passwordresetverification`, {
          state: { session_id: result.session_id, otp_expires_at: result.expires_at },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center p-4 max-w-[425px] mx-auto">
        <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-8">
          <div className="flex items-center mb-8">
            <button onClick={() => navigate(-1)}>
              <HiArrowLeft size={24} />
            </button>
            <p className="ml-20 flex items-center justify-center text-2xl text-white">
              Nulstil kode
            </p>
          </div>
          <h1 className="mb-4">Indtast det telefonnummer, du vil nulstille kodeord for</h1>
          <PhoneNumber
            name="phoneNumber"
            placeholder="Ex. +45 12 34 56 78"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="DK"
          />
          <button className="btn my-2 mt-8 flex w-full justify-center gap-2 bg-green-500 py-2 px-4 text-green-100"
            type="submit"
            onClick={(e) => submitPhoneNumber(e)}>
            Indsend
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
