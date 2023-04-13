import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");

  const submitPhonenumber = async (e) => {
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
      const { session_id, expires_in } = result;

      if (response.ok) {
        console.log(response.statusText);
        navigate("/passwordresetverification", {
          state: { sessionId: session_id, expiresIn: expires_in },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="w-3/4">Indtast det telefonnummer, du vil nulstille kodeord for</h1>
        <form className="flex h-1/4 flex-col items-center justify-evenly">
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+45 .. .. .. .."
          />
          <button
            className="btn-error btn"
            type="submit"
            onClick={(e) => submitPhonenumber(e)}
          >
            Indsend
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
