import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ChoosePassword = () => {
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // checks whether password matches verification
  function matchPassword(password, verify) {
    if (password.length == 0 || verify.length == 0) {
      return false;
    }

    if (password == verify) {
      return true;
    } else return false;
  }

  const submitPassword = async () => {
    try {
      const response = await fetch(API_URL + "/auth/reset-password/confirm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: location.state.sessionId,
          password: password,
        }),
      });

      if (response.ok) {
        console.log(`server said: ${response.statusText}`);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-full flex-col justify-around items-center py-2 ">
      <h1>Vælg adgangskode</h1>
      {/* password */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Vælg kode</span>
        </label>
        <input
          type="text"
          pattern="\d*"
          onChange={(e) => setPassword(e.target.value)}
          required
          maxLength={32}
          placeholder="max 32 tegn"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      {/* verify */}
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Indtast kode igen</span>
        </label>
        <input
          type="text"
          onChange={(e) => setVerify(e.target.value)}
          required
          maxLength={32}
          placeholder="max 32 tegn"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      {/* submit */}
      <button
        type="submit"
        disabled={!matchPassword(password, verify)}
        className={`btn my-2 w-full max-w-xs bg-green-500 text-green-300`}
        onClick={() => submitPassword()}
      >
        Submit
      </button>
    </div>
  );
};

export default ChoosePassword;
