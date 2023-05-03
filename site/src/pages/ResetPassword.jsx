import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"
import PhoneNumber from "react-phone-number-input";

const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cdSeconds, setCdSeconds] = useState(0);
  const [cooldownStarted, setCooldownStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cdSeconds > 0 && cooldownStarted) {
      setTimeout(() => setCdSeconds(cdSeconds - 1), 1000);
    }
    else {
      setCooldownStarted(false)
    }

  }, [cdSeconds])

  const onAuthOkay = async (body) => {
    navigate(`/passwordresetverification`, {
      state: { session_id: body.session_id, otp_expires_at: body.expires_at },
    });

  };

  const tooEarlySmsRequest = (error) => {

    const { cooldown_expires_at } = error.detail;

    setError("Du har for nyligt anmodet om at nulstille din adgangskode.");

    const timeDeltaSeconds = Math.floor((new Date(cooldown_expires_at).getTime() - Date.now()) / 1000);

    if (!cooldownStarted) {
      setCdSeconds(timeDeltaSeconds);
      setCooldownStarted(true);
    }
  }

  const onInvalidCredentials = () => {
    setError(`Ugyldigt telefonnummber. Prøv igen.`);
  };

  const submitPhoneNumber = async (e) => {
    setIsSubmitting(true);

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
        onAuthOkay(result);
      }
      else if (response.status == 425) {
        tooEarlySmsRequest(result);
      }
      else {
        onInvalidCredentials();
      }

      setIsSubmitting(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="grid h-screen place-items-center p-4 max-w-[425px] mx-auto">
        <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-8">
          <div className="flex items-center mb-4">
            <button onClick={() => navigate(-1)}>
              <HiArrowLeft size={24} />
            </button>
            <p className="ml-20 flex items-center justify-center text-2xl text-white">
              Nulstil kode
            </p>
          </div>
          {error &&
            <div className="p-4 mb-4 rounded-lg bg-error text-white">
              {error}
              {/* Cooldown */}
              {cdSeconds > 0 && (
                <p>
                  Prøv igen om:{" "}
                  {cdSeconds === 1
                    ? `${cdSeconds} sekund`
                    : cdSeconds < 60
                      ? `${cdSeconds} sekunder`
                      : cdSeconds == 61
                        ? `1 minut og 1 sekund`
                        : cdSeconds < 120
                          ? `1 minut og ${cdSeconds % 60} sekunder`
                          : `${Number.parseInt(cdSeconds / 60)} minutter og ${cdSeconds % 60} sekund${cdSeconds % 60 === 1 ? "" : "er"}`}
                </p>
              )}
            </div>
          }
          <h1 className="mb-4">Indtast det telefonnummer, du vil nulstille kodeord for</h1>
          <PhoneNumber
            name="phoneNumber"
            placeholder="Ex. +45 12 34 56 78"
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="DK"
          />
          <button className={`btn my-2 mt-8 flex w-full justify-center gap-2 bg-green-500 py-2 px-4 text-green-100 ${isSubmitting && 'loading'}`}
            type="submit"
            onClick={(e) => submitPhoneNumber(e)}>
            {!isSubmitting &&
                <>
                  <span className="text-center mt-0.5 mr-2">Indsend</span>
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
                </>
              }
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
