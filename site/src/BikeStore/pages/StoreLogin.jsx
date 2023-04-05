import React, { useState } from "react";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function StoreLogin() {
  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch(API_URL + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      secureLocalStorage.setItem("accesstoken", result.access_token);
      navigate(`/mybikes`, { replace: true });
    } else {
      setError(result.detail);
    }
  };

  return (
    <div className="grid h-screen place-items-center p-4">
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        {/* Errors */}
        {error && (
          <div className="rounded-lg bg-error p-4 text-white">{error}</div>
        )}

        {/* Use a form element to wrap the inputs and button */}
        <form
          className="rounded-lg bg-white p-2 shadow dark:bg-gray-800 sm:px-2 md:px-4 lg:px-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Use input elements for phoneNumber and password */}
          <h1 className="mb-4 flex justify-center text-3xl">Login</h1>
          <div
            className="px-8 pb-2 font-light text-gray-800 dark:text-white"
            control={control}
            rules={{ required: true }}
          >
            Tlf nr:
            <span className="required-dot text-red-500"> *</span>
          </div>
          <div className="px-8">
            <input
              type="text"
              placeholder="Telefonnummer"
              className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              {...register("phone_number")}
            />
          </div>
          <div className="space-y-2 py-4 px-8">
            <label className="font-light text-gray-800 dark:text-white">
              Adgangskode:
              <span className="required-dot text-red-500"> *</span>
            </label>
            <input
              type="password"
              className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Adgangskode"
              {...register("password")}
            />
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 sm:px-2 md:px-4 lg:px-10">
            <button
              className="btn my-2 mt-8 w-full max-w-xs bg-green-500 py-2 px-4 text-green-100"
              type="submit"
            >
              Login
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
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoreLogin;
