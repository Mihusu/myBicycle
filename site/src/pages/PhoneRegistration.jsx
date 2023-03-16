import React from "react";
import { useForm } from "react-hook-form";
import { PhoneNumber } from "../components/register/PhoneNumber";
import { useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:8000/auth/register/me";

const PhoneRegistration = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      password: "",
      verify: "",
    },
  });

  const watchPassword = watch(["password", "verify"]);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/smsverification/${data.session_id}`))
      .catch((error) => setError(error.message));
  };

  const onError = (err) => {
    console.log(err);
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
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-20">
            <div className="self-center py-2 text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
              Tlf nr.
              <span className="required-dot text-red-500"> *</span>
            </div>
            <label className="font-light text-gray-800 dark:text-white"></label>
            <div className="form-control w-full max-w-xs">
              <PhoneNumber
                name="phone_number"
                control={control}
                rules={{ required: true }}
              />
              <div />

              {/* password */}
              <div className="pt-4 pb-2 font-light text-gray-800 dark:text-white">
                Vælg adgangskode
                <span className="required-dot text-red-500"> *</span>
              </div>

              <div className="">
                <input
                  type="text"
                  pattern="\d*"
                  placeholder="Adgangskode"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  {...register(
                    "password",
                    { required: true },
                    { min: 8, max: 32 }
                  )}
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
                  placeholder="Adgangskode"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  {...register("verify", { required: true }, { min: 8, max: 32 })}
                />
                {errors.verify && <span>This field is required</span>}
              </div>

              { matchPassword(watchPassword[0], watchPassword[1]) ? (
                <button className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100" type="submit">
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
              ) : (
                <button className="btn my-2 mt-8 flex w-full max-w-xs justify-center gap-2 bg-green-500 py-2 px-4 text-green-100"
                  type="submit"
                  disabled>
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
              )}
            </div>
          </div>
        </form>
    </div>
  );
};

export default PhoneRegistration;
