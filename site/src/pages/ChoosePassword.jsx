import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ChoosePassword = () => {
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    const URI = API_URL + `/auth/reset-password/confirm`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: location.state.session_id,
        password: password,
      }),
    };

    try {
      const response = await fetch(URI, requestOptions);

      if (response.ok) {
        setSuccess("Din adgangskode er nu ændret. Omdirigerer dig til login...");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid h-screen place-items-center p-4 max-w-[425px] mx-auto">
      <div className="rounded-lg shadow bg-gray-800 p-12">
        {/* Response success */}
        {success && <p className="p-4 mb-4 rounded-lg bg-green-500 text-white">{success}</p>}
        <div className="text-center text-2xl text-white mb-4">
          Nulstil adgangskode
        </div>
        {/* password */}
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text text-gray-800 dark:text-white">Vælg kode
              <span className="text-red-500 required-dot"> *</span>
            </span>
          </label>
          <input
            type="password"
            pattern="\d*"
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={64}
            placeholder="Vælg adgangskode"
            className="input-bordered input w-full max-w-xs rounded-lg border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        {/* verify */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-gray-800 dark:text-white">Indtast kode igen
              <span className="text-red-500 required-dot"> *</span>
            </span>
          </label>
          <input
            type="password"
            onChange={(e) => setVerify(e.target.value)}
            required
            maxLength={64}
            placeholder="Bekræft adgangskode"
            className="input-bordered input w-full max-w-xs rounded-lg border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        {/* submit */}
        <button type="submit" className={`btn my-6 mt-8 w-full bg-green-500 py-2 text-green-100 ${isSubmitting && 'loading'}`}
          onClick={() => submitPassword()}
          disabled={!matchPassword(password, verify)}>
          {!isSubmitting &&
            <>
              Bekræft
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-10 login-button"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </>
          }
        </button>
        <p className="text-gray-400">Vil du gerne vende tilbage til login siden? <Link to='/login'><span className="text-blue-500">Login her</span></Link></p>
      </div>
    </div>
  );
};

export default ChoosePassword;
