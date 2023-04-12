import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PasswordResetVerification = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const sessionId = location.state.sessionId;
  const expiresIn = location.state.expiresIn;

  const submitPasswordResetCode = async (e) => {
    e.preventDefault(); // prevent form from refreshing page on submit

    try {
      const response = await fetch(API_URL + "/auth/reset-password/verify", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          otp: passwordResetCode,
        }),
      });

      if (response.ok) {
        console.log(response.statusText);
        navigate("/choosepassword", { state: { sessionId: sessionId } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1>Enter verification code to reset your password</h1>
        <div>{`session id: ${sessionId} - expires in: ${expiresIn}`}</div>
        <form className="flex h-1/4 flex-col items-center justify-evenly">
          <input
            onChange={(e) => setPasswordResetCode(e.target.value)}
            placeholder="SMS code goes here"
          />
          <button
            className="btn-error btn"
            type="submit"
            onClick={(e) => submitPasswordResetCode(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordResetVerification;
