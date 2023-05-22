import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { RadioButton } from "../components/register/Radiobutton";
import { PhoneNumber } from "../components/register/PhoneNumber";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL;

const BikeRegistration = () => {

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: "",
      frame_number: "",
      gender: "",
      is_electric: "",
      kind: "",
      brand: "",
      color: "",
      image: undefined,
      receipt: undefined
    },
  });

  const [responseError, setResponseError] = useState("")
  const [responseSuccess, setResponseSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onBikeCreated = async () => {
    setResponseError(null); // Clear any previous error message
    // Response was okay
    setResponseSuccess("Den nye cykel er registreret i systemet. Omdirigerer dig til login...");
    setTimeout(() => navigate("/login"), 5000);
  };

  const onInvalidCredentials = () => {
    setResponseError(`Ugyldigt telefonnummer. I øjeblikket er kun danske telefonnumre gyldige`);
  };

  const onAlreadyRegisteredFrameNumber = (error) => {
    const { frame_number } = error.detail

    setResponseError(`Cykel med stelnummer ${frame_number} er allerede registreret`);
  };

  const onInvalidFrameNumber = () => {
    setResponseError("Ugyldigt stelnummer. Se https://da.wikipedia.org/wiki/Det_danske_stelnummersystem_for_cykler for gyldige stelnumre");
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === "image") {
          formData.append(key, data.image[0]);
        } else if (key === "receipt" && data.receipt) { // add a check to see if the receipt field is defined
          formData.append(key, data.receipt[0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch(API_URL + "/bikes", {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      const body = await response.json();

      switch (response.status) {
        case 201: await onBikeCreated(); break;
        case 400: onInvalidCredentials(); break;
        case 405: onAlreadyRegisteredFrameNumber(body); break;
        case 406: onInvalidFrameNumber(); break;
      }

      setIsSubmitting(false);

    } catch (error) {
      console.error(error);
    }

  };

  const onError = (error) => {
    console.error(error);
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center mx-auto max-w-[385px]">
      <div className=" rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-10">
        <div className="flex items-center p-2 text-xl font-light text-gray-800 dark:text-white sm:text-2xl mt-2 mb-2">
          <button className='pr-8' onClick={() => navigate(-1)}>
            <HiArrowLeft size={24} />
          </button>
          Cykel registrering
        </div>

        <form className="px-2" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="space-y-2">
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h1 className="mb-2">
                Stelnummer:
                <span className="required-dot text-red-500"> *</span>
              </h1>
              {errors.frame_number && <span className="text-red-300">Stelnummer er påkrævet</span>}
              <input
                type="text"
                id="stelnummer"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Indtast stelnummer"
                {...register(
                  "frame_number",
                  { required: true },
                  { min: 8, max: 32 }
                )}
              />
            </div>

            {/* Phonenumber */}
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 ">
              <h2 className="mb-2">
                Indtast mobiloplysninger på den nye ejer:
                <span className="required-dot text-red-500"> *</span>
              </h2>
              <div>
                {errors.phone_number && <span className="text-red-300">Telefon nr. er påkrævet</span>}
                <PhoneNumber
                  name="phone_number"
                  control={control}
                  rules={{ required: true }}
                />
              </div>
            </div>

            {/* Bike model */}
            <div className=" rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h2 className="mb-2">Vælg model:</h2>
              {errors.gender && <span className="text-red-300">Model er påkrævet</span>}
              <div className="grid grid-cols-3 place-items-center px-4 py-2">
                <RadioButton
                  labelName={"Herre"}
                  value="male"
                  color={"radio border-blue-500 bg-content"}
                  {...register("gender", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Dame"}
                  value="female"
                  color={"radio border-pink-500 bg-content"}
                  {...register("gender", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Unisex"}
                  value="uni_sex"
                  color={"radio border-purple-500 bg-content"}
                  {...register("gender", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* Electic */}
            <div className=" rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h2 className="mb-2">Er det en El-cykel?</h2>
              {errors.is_electric && <span className="text-red-300">Drivkraft er påkrævet</span>}
              <div className="grid grid-cols-2 place-items-center px-4 py-2">
                <RadioButton
                  labelName={"El-cykel"}
                  color={"radio border-green-500 bg-content"}
                  value={true}
                  {...register("is_electric", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Ikke El-cykel"}
                  color={"radio border-yellow-900 bg-content"}
                  value={false}
                  {...register("is_electric", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* Bike type */}
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h2 className="mb-2">Vælg cykel type:</h2>
              {errors.kind && <span className="text-red-300">Typen er påkrævet</span>}
              <div className="grid grid-cols-2 place-items-center px-4 py-2">
                <RadioButton
                  labelName={"City"}
                  color={"radio border-teal-500 bg-content"}
                  value="city"
                  {...register("kind", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Gravel"}
                  color={"radio border-indigo-500 bg-content"}
                  value="gravel"
                  {...register("kind", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Lad"}
                  color={"radio border-yellow-500 bg-content"}
                  value="cargo"
                  {...register("kind", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Racer"}
                  color={"radio border-red-500 bg-content"}
                  value="race"
                  {...register("kind", {
                    required: true,
                  })}
                />
              </div>
            </div>

            {/* Brand */}
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h1 className="mb-2">Brand:</h1>
              {errors.brand && <span className="text-red-300">Mærke er påkrævet</span>}
              <input
                type="text"
                id="brand"
                className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Skriv brandet Ex. 'MBK'"
                {...register(
                  "brand",
                  { required: true },
                  { min: 1, max: 32 }
                )}
              />
            </div>

            {/* Color */}
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
              <h2 className="mb-2">Vælg en farve:</h2>
              {errors.color && <span className="text-red-300">Farve er påkrævet</span>}

              <div className="grid grid-cols-2 place-items-center ">
                <RadioButton
                  labelName={"Sort"}
                  color={"radio border-neutral-900 bg-content"}
                  value="black"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Hvid"}
                  color={"radio border-neutral-50 bg-content"}
                  value="white"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Grå"}
                  color={"radio border-gray-400 bg-content"}
                  value="gray"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Rød"}
                  color={"radio border-red-500 bg-content"}
                  value="red"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Blå"}
                  color={"radio border-blue-700 bg-content"}
                  value="blue"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Grøn"}
                  color={"radio border-green-700 bg-content"}
                  value="green"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Gul"}
                  color={"radio border-yellow-400 bg-content"}
                  value="yellow"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Orange"}
                  color={"radio border-orange-500 bg-content"}
                  value="orange"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Purple"}
                  color={"radio border-purple-400 bg-content"}
                  value="purple"
                  {...register("color", {
                    required: true,
                  })}
                />
                <RadioButton
                  labelName={"Andet"}
                  color={"radio radio-primary"}
                  value="other"
                  {...register("color", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>

          {/* Bike image */}
          <h1 className="px-4 py-2">Billede af cykel:
            <span className="text-red-500 required-dot"> *</span>
          </h1>
          {errors.image && <span className="text-red-300 ml-4">Billede af cyklen er påkrævet</span>}
          <div className="mb-6 ml-8 flex items-center justify-center">
            <input
              type="file"
              id="file-image"
              {...register("image", { required: true })}
            />
          </div>

          {/* Receipt image */}
          <h1 className="px-4 py-2">Billede af kvittering:
            <span className="text-red-500 required-dot"> *</span>
          </h1>
          {errors.receipt && <span className="text-red-300 ml-4">Kvittering er påkrævet</span>}
          <div className="mb-6 ml-8 flex items-center justify-center">
            <input
              type="file"
              id="file-image"
              {...register("receipt", { required: true })}
            />
          </div>

          {responseSuccess && (
            <div className="p-4 rounded-lg bg-green-500 text-white mt-8 mb-4">
              {responseSuccess}
            </div>
          )}
          {responseError && (
            <div className="p-4 rounded-lg bg-error text-white mt-8 mb-4">
              {responseError}
            </div>
          )}
          <button
            type="submit"
            className={`btn flex w-full items-center justify-center rounded-lg bg-blue-600 mt-2 py-2 px-8 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 ${isSubmitting && 'loading'}`}
          >
            {!isSubmitting &&
              <>
                <span className="text-center mb-0.5 mr-2">Registrer Cykel</span>
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
        </form>
      </div>
    </div>
  );
};

export default BikeRegistration;
