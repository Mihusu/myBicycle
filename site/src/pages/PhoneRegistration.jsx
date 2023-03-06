import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneNumber } from "../components/register/PhoneNumber";

const URL = "http://127.0.0.1:8000/auth/register/me";

const PhoneRegistration = () => {
  const {
    register,
    control,
    watch,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, touchedFields },
  } = useForm({
    defaultValues: {
      phone_number: "12233445",
      password: "12345678",
      verify: "12345678",
    },
  });

  const watchPassword = watch(["password", "verify"]);

  const onSubmit = async (data, event) => {
    console.log("submit hit")
    // async request which may result in an error
    try {
      const myHeader = new Headers({"Content-Type": "application/json"})
      console.log("this is DATA: ", data);
      console.log("this is event: ", event);
      const res = await fetch(URL, {headers: myHeader, method: "POST", mode: "cors", body: JSON.stringify(data)});
      console.log("response :" + res);
    } catch (e) {
      console.log(e);
    }
  };

  // checks whether password matches verification
  function matchPassword(password, verify) {
    if (password.length == 0 || verify.length == 0) {
      return false;
    }

    if (password.length >= 8 && password == verify) {
      return true;
    } else return false;
  }

  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <form
        className="flex w-full items-center justify-center self-center md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-20">
          <div className="self-center py-2 text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
            Tlf nr.
            <span className="required-dot text-red-500">*</span>
          </div>
          <label className="font-light text-gray-800 dark:text-white"></label>
          <div className=" w-full max-w-xs">
            <PhoneNumber
              {...register("phone_number", { required: true })}
              type="number"
            />
            <div />
            <div className="pt-4 pb-2 font-light text-gray-800 dark:text-white">
              Vælg adgangskode
              <span className="required-dot text-red-500">*</span>
            </div>

            {/* password */}
            <div className="">
              <input
                type="text"
                pattern="\d*"
                {...register(
                  "password",
                  { required: true },
                  { min: 8, max: 32 }
                )}
                name="password"
                placeholder="Adgangskode"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.password && <span>This field is required</span>}
            </div>

            {/* verify */}
            <div className="pt-4 pb-2">
              <label className="label">
                <span className="font-light text-gray-800 dark:text-white">
                  Bekræft kode
                </span>
              </label>
              <input
                type="text"
                {...register("verify", { required: true }, { min: 8, max: 32 })}
                name="verify"
                placeholder="Adgangskode"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              {errors.verify && <span>This field is required</span>}
            </div>

            {!matchPassword(watchPassword[0], watchPassword[1]) ? (
              <button className="btn" type="button" disabled>
                Registrer
              </button>
            ) : (
              <button className="btn" type="submit">Registrer</button>
            )}

            <button
              type="submit"
              disabled={!matchPassword(watchPassword[0], watchPassword[1])}
              className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100 "
            >
              Registrer
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
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhoneRegistration;
