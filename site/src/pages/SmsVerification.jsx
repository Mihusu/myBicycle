import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL;

export const SmsVerification = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { session_id } = useParams();
  const [error, setError] = useState("");
  const [cdSeconds, setCdSeconds] = useState(0);
  const [timeRemainStarted, setTimeRemainStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (cdSeconds > 0 && timeRemainStarted) {
      setTimeout(() => setCdSeconds(cdSeconds - 1), 1000);
    }
    else {
      setTimeRemainStarted(false)
    }

  }, [cdSeconds])

  useEffect(() => {
    setCdSeconds(OtpTimeRemain())
  })

  const OtpTimeRemain = () => {

    const otp_expires_at = location.state.otp_expires_at

    const timeDeltaSeconds = Math.floor((new Date(otp_expires_at).getTime() - Date.now()) / 1000);

    if (!timeRemainStarted) {
      setCdSeconds(timeDeltaSeconds);
      setTimeRemainStarted(true);
    }
    return timeDeltaSeconds
  }

  const onAuthOkay = async (data) => {
    secureLocalStorage.setItem("accesstoken", data.access_token);

    setError(null); // Clear any previous error message
    setSuccess("Din konto er nu oprettet. Omdiregere dig til hjem...");
    setTimeout(() => navigate("/mybikes"), 3000);
  };

  const onInvalidCredentials = (error) => {
    setError(`Ugyldigt engangskode. Prøv igen.`);
  };

  const onOtpIsNoLongerValid = (error) => {
    setError("Engangskoden er udløbet. Prøv at registrere dig igen.");
  };

  const onSubmit = async ({ otp }) => {
    setIsSubmitting(true);

    const URI = API_URL + `/auth/register/me/check-otp`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, session_id }),
    };

    try {
      const response = await fetch(URI, requestOptions);

      if (response.ok) {
        const data = await response.json();
        onAuthOkay(data);

      } else if (response.status == 410) {
        onOtpIsNoLongerValid();

      } else {
        const error = await response.json();
        onInvalidCredentials(error)
      }

      setIsSubmitting(false);

    } catch (error) {
      setError(error.detail);
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className="grid h-screen place-items-center p-4 max-w-[425px] mx-auto">
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-8">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)}>
            <HiArrowLeft size={24} />
          </button>
          <p className="ml-14 text-2xl text-white">SMS verifikation</p>
        </div>
        <form className="w-full"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* Response success */}
          {success && (<p className="p-4 mb-4 rounded-lg bg-green-500 text-white">{success}</p>)}
          {/* Errors */}
          {error && (<div className="p-4 my-4 rounded-lg bg-error text-white">{error}</div>)}

          <p>Vi har lige sendt dig en SMS med en bekræftelseskode.</p>

          <p className="mt-4 text-gray-400">Du bedes bekræfte inden:{" "}
            {cdSeconds > 0 && (
              <span className="text-gray-400">
                {cdSeconds === 1
                  ? `${cdSeconds} sekund`
                  : cdSeconds < 60
                    ? `${cdSeconds} sekunder`
                    : cdSeconds == 61
                      ? `1 minut og 1 sekund`
                      : cdSeconds < 120
                        ? `1 minut og ${cdSeconds % 60} sekunder`
                        : `${Number.parseInt(cdSeconds / 60)} minutter og ${cdSeconds % 60} sekund${cdSeconds % 60 === 1 ? "" : "er"}`}
              </span>
            )}
            {cdSeconds <= 0 && (
              <span className="text-gray-400">Udløbet</span>
            )}
          </p>

          <div className="w-full mt-4">
            <input
              type="text"
              className=" rounded-lg border-transparent border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Indtast din bekræftelses kode"
              {...register("otp")}
            />
          </div>
          <div className="py-2">
            <button type="submit" className={`btn my-2 mt-8 w-full bg-green-500 py-2 text-green-100 ${isSubmitting && 'loading'}`} >
              {!isSubmitting &&
                <>
                  <span className="text-center mt-0.5 mr-2">Valider</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-10"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmsVerification;
