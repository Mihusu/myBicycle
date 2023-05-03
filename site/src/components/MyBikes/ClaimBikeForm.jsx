import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL;

export const ClaimBikeForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = secureLocalStorage.getItem("accesstoken");

  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      claimBikeCode: "",
    },
  });

  const watchClaimBikeCode = watch(["claimBikeCode"]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        API_URL + `/bikes/claim/${data.claimBikeCode}`,
        requestOptions
      );

      const body = await response.json();

      if (!response.ok) {
        setError(body.detail);
        return;
      }

      //Trigger a page refresh and go to main page
      navigate("/mybikes");
      setIsSubmitting(false);
    } catch (error) {
      // Something failed miserably
      console.error(error);
    }
  };

  // checks whether claimcode is 36 letters long.
  function matchLength(claimBikeCode) {
    if (claimBikeCode.length == 36) {
      return true;
    } else return false;
  }

  return (
    <div className="flex h-screen justify-center">
      <div className="w-full max-w-md p-4">
        <form
          className="flex flex-col items-center justify-center rounded-lg border bg-gray-800 px-10 py-8 hover:shadow-xl dark:bg-gray-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <p className="mb-4 mr-1 py-2 font-semibold text-white">
              Skriv din indløsningskode du har modtaget på sms nedenfor for at
              indløse din cykel.
            </p>
            <label className="mr-1 font-semibold  text-white">
              Engangskode:
              <span className="required-dot text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="required-engangskode"
              className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              {...register(
                "claimBikeCode",
                { required: true },
                { min: 36, max: 36 },
                {
                  pattern:
                    /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/i,
                }
              )}
            />
            {error && (
              <span className="flex justify-center text-red-500">{error}</span>
            )}
          </div>

          <button
            className={`btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 text-green-100 ${
              isSubmitting && "loading"
            }`}
            type="submit"
            disabled={!matchLength(watchClaimBikeCode[0])}
          >
            {!isSubmitting && (
              <>
                Indløs
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
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
