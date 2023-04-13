import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PasswordResetVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordResetCode, setPasswordResetCode] = useState("");

  let sessionId = 0;
  let expiresIn = 0;

  if (location.state != null) {
    sessionId = location.state.sessionId;
  }
  if (location.state != null) {
    expiresIn = location.state.expiresIn;
  }

  const readableExpiryTime = new Date(expiresIn).toLocaleTimeString();

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
        console.log(`server said ${response.statusText}`);
        navigate("/choosepassword", { state: { sessionId: sessionId } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1>Angiv verifikationskode for at nulstille dit password</h1>
        <h1>
          {expiresIn
            ? `Kodens gyldighed udløber ${readableExpiryTime}`
            : "der er ugler i mosen"}
        </h1>
        <form className="flex h-1/4 flex-col items-center justify-evenly">
          <input
            onChange={(e) => setPasswordResetCode(e.target.value)}
            placeholder="SMS kode til nulstilling"
          />
          <button
            className="btn-error btn"
            type="submit"
            onClick={(e) => submitPasswordResetCode(e)}
          >
            Indsend
          </button>
        </form>
      </div>
    </>
  );
};

export default PasswordResetVerification;
