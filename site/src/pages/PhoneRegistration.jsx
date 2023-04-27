import { useState } from "react";
import { useForm } from "react-hook-form";
import { PhoneNumber } from "../components/register/PhoneNumber";
import { Link, useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;


const PhoneRegistration = () => {

  const [resError, setResError] = useState("");

  const {
    register,
    control,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
      verify: "",
    },
  });

  const watchPassword = watch(["password", "verify"]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
      const response = await fetch(API_URL + '/auth/register/me', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'phone_number' : data.phoneNumber,
          'password' : data.password
        }),
      });
      
      const body = await response.json();

      if (!response.ok) {
        setResError(`Der findes allerede en cykelejer med det opgivet telefonnummer: ${data.phoneNumber}`);
        return;
      }

      navigate(`/smsverification/${body.session_id}`, { state: { otp_expires_at: body.expires_at }});

    } catch (error) {
      console.log(error);
    }

  };

  const onError = (err) => {
    console.log(err);
  };

  // Required by OWASP requirement 2.1.1. See https://owasp.org/www-pdf-archive/OWASP_Application_Security_Verification_Standard_4.0-en.pdf 
  const MIN_PASSWORD_LENGTH = 12

  // checks whether password matches verification
  function matchPassword(password, verify) {
    if (password.length == 0 || verify.length == 0) {
      return false;
    }

    if (password.length >= MIN_PASSWORD_LENGTH && password === verify) {
      return true;
    } else return false;
  }

  return (
    <div className="grid h-screen place-items-center p-4">
      <form
        className="flex w-full items-center justify-center self-center md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="rounded-lg bg-white px-8 py-8 shadow dark:bg-gray-800 sm:px-10 md:px-14 lg:px-20">
          <h1 className="flex justify-center text-3xl mb-4">Registrér</h1>

          {/* Errors */}
          {resError && <div className="p-4 rounded-lg bg-error text-white max-w-xs">{resError}</div>}

          <div className="self-center py-2 text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
            Tlf nr.
            <span className="required-dot text-red-500"> *</span>
          </div>
          <label className="font-light text-gray-800 dark:text-white"></label>
          <div className="form-control w-full max-w-xs">
            <PhoneNumber
              name="phoneNumber"
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
                type="password"
                placeholder="Skal indeholde 12 tegn eller derover"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register(
                  "password",
                  { required: true },
                  { min: MIN_PASSWORD_LENGTH }
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
                type="password"
                placeholder="Adgangskode"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                {...register(
                  "verify",
                  { required: true },
                  { min: MIN_PASSWORD_LENGTH }
                )}
              />
              {errors.verify && <span>This field is required</span>}
            </div>

            {matchPassword(watchPassword[0], watchPassword[1]) ? (
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

            <p>Er du allerede oprettet som bruger? <Link to='/login'><span className="text-blue-500">Login her</span></Link></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PhoneRegistration;
