import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export const SmsVerification = () => {
  const {
    register,
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const { session_id } = useParams();

  const onSubmit = ({ otp }) => {
    console.log(otp);
    const URI = `http://127.0.0.1:8000/auth/register/me/check-otp`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, session_id }),
    };
    fetch(URI, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        secureLocalStorage.setItem('accesstoken', data.access_token)
        // possibly set refresh token also
        return navigate(`/mybikes`)
      })
      .catch((error) => setError(error.message));
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className="flex justify-center py-40">
      <form
        className="flex  w-72 justify-center rounded-2xl bg-white  p-10 py-10 shadow-lg dark:bg-gray-800"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="px-30 py-30 py-30 w-ful h-full ">
          <p className=" mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
            Bekræft inden:
          </p>

          <div className="w-full">
            <div className=" relative mt-4 ">
              <input
                type="number"
                className=" w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Indtast din bekræftelses kode"
                {...register("otp")}
              />
            </div>
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="w-full rounded-lg  bg-indigo-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
            >
              Valider
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default SmsVerification;
