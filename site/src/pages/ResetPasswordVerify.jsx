import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL;

export const ResetPasswordVerify = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cdSeconds, setCdSeconds] = useState(0);
  const [timeRemainStarted, setTimeRemainStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cdSeconds > 0 && timeRemainStarted) {
      setTimeout(() => setCdSeconds(cdSeconds - 1), 1000);
    } else {
      setTimeRemainStarted(false);
    }
  }, [cdSeconds]);

  useEffect(() => {
    setCdSeconds(OtpTimeRemain());
  });

  const OtpTimeRemain = () => {
    const otp_expires_at = location.state.otp_expires_at;

    const timeDeltaSeconds = Math.floor(
      (new Date(otp_expires_at).getTime() - Date.now()) / 1000
    );

    if (!timeRemainStarted) {
      setCdSeconds(timeDeltaSeconds);
      setTimeRemainStarted(true);
    }
    return timeDeltaSeconds;
  };

  const onAuthOkay = async () => {
    const session_id = location.state.session_id;
    navigate("/choosepassword", { state: { session_id: session_id } });
  };

  const onInvalidCredentials = () => {
    setError(`Ugyldigt engangskode. Prøv igen.`);
  };

  const onOtpIsNoLongerValid = () => {
    setError("Engangskoden er udløbet. Prøv at registrere dig igen."); // TODO: should this say try to reset your password again?
  };

  const onSubmit = async ({ otp }) => {
    setIsSubmitting(true);

    const URI = API_URL + `/auth/reset-password/verify`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp: otp, session_id: location.state.session_id }),
    };

    try {
      const response = await fetch(URI, requestOptions);

      if (response.ok) {
        onAuthOkay();

      } else if (response.status == 410) {
        onOtpIsNoLongerValid();
        setIsSubmitting(false);

      } else {
        onInvalidCredentials();
        setIsSubmitting(false);

      }
    } catch (error) {
      setError(error.detail);
    }
  };

  const onError = (err) => {
    console.error(err);
  };

  return (
    <div className="mx-auto grid h-screen max-w-[425px] place-items-center p-4">
      <div className="rounded-lg bg-gray-800 p-8 shadow dark:bg-gray-800">
        <div className="mb-4 flex items-center">
          <button onClick={() => navigate(-1)}>
            <HiArrowLeft size={24} />
          </button>
          <p className="ml-14 text-2xl text-white">SMS verifikation</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Errors */}
          {error && (
            <div className="my-4 rounded-lg bg-error p-4 text-white">
              {error}
            </div>
          )}

          <p className=" text-white">
            Vi har lige sendt dig en SMS med en bekræftelseskode.
          </p>

          <p className="mt-4 text-white">
            Du bedes bekræfte inden:{" "}
            {cdSeconds > 0 && (
              <span className="text-white">
                {cdSeconds === 1
                  ? `${cdSeconds} sekund`
                  : cdSeconds < 60
                  ? `${cdSeconds} sekunder`
                  : cdSeconds == 61
                  ? `1 minut og 1 sekund`
                  : cdSeconds < 120
                  ? `1 minut og ${cdSeconds % 60} sekunder`
                  : `${Number.parseInt(cdSeconds / 60)} minutter og ${
                      cdSeconds % 60
                    } sekund${cdSeconds % 60 === 1 ? "" : "er"}`}
              </span>
            )}
            {cdSeconds <= 0 && <span className="text-gray-400">Udløbet</span>}
          </p>

          <div className="mt-4 w-full">
            <input
              type="text"
              className=" w-full rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-gray-700 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-purple-600"
              placeholder="Indtast din bekræftelses kode"
              {...register("otp")}
            />
          </div>
          <div className="py-2">
            <button
              type="submit"
              className={`btn my-2 mt-8 w-full bg-green-500 py-2 text-green-100 ${
                isSubmitting && "loading"
              }`}
            >
              {!isSubmitting && (
                <>
                  Valider
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="login-button h-8 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordVerify;
