import React, { useState } from "react";
import RadioButton from "../components/register/Radiobutton";
import { PhoneNumber } from "../components/register/PhoneNumber";
import { useForm } from "react-hook-form";
const BikeRegistration = () => {
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
      frame_number: "",
    },
  });

  return (
    <div className="my-8 flex flex-col items-center justify-center ">
      <div className=" rounded-lg bg-white px-4 py-8 shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-10">
        <div className="self-center text-xl font-light text-gray-800 dark:text-white sm:text-2xl">
          Cykel registering
        </div>

        <div className="mt-4 p-2">
          <form
            method="post"
            action="http://127.0.0.1:8000/bikes"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h1 className="mb-2">
                  Stelnummer:
                  <span className="required-dot text-red-500"> *</span>
                </h1>
                <input
                  type="text"
                  id="Stelnummer"
                  name="frame_number"
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
                <div className="grid grid-cols-3 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"Herre"}
                    name="gender"
                    color={"radio border-blue-500 bg-content"}
                    value="male"
                  />
                  <RadioButton
                    labelName={"Dame"}
                    name="gender"
                    color={"radio border-pink-500 bg-content"}
                    value="female"
                  />
                  <RadioButton
                    labelName={"Unisex"}
                    name="gender"
                    color={"radio border-purple-500 bg-content"}
                    value="uni_sex"
                  />
                </div>
              </div>

              {/* Electic */}
              <div className=" rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Er det en El-cykel?</h2>
                <div className="grid grid-cols-2 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"El-cykel"}
                    name={"is_electric"}
                    color={"radio border-green-500 bg-content"}
                    value={true}
                  />
                  <RadioButton
                    labelName={"Ikke El-cykel"}
                    name={"is_electric"}
                    color={"radio border-yellow-900 bg-content"}
                    value={false}
                  />
                </div>
              </div>

              {/* Bike type */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg cykel type:</h2>
                <div className="grid grid-cols-2 place-items-center px-4 py-2">
                  <RadioButton
                    labelName={"City"}
                    name={"kind"}
                    color={"radio border-teal-500 bg-content"}
                    value="city"
                  />
                  <RadioButton
                    labelName={"Gravel"}
                    name={"kind"}
                    color={"radio border-indigo-500 bg-content"}
                    value="gravel"
                  />
                  <RadioButton
                    labelName={"Lad"}
                    name={"kind"}
                    color={"radio border-yellow-500 bg-content"}
                    value="cargo"
                  />
                  <RadioButton
                    labelName={"Racer"}
                    name={"kind"}
                    color={"radio border-red-500 bg-content"}
                    value="race"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h1 className="mb-2">Brand:</h1>
                <input
                  type="text"
                  id="Brand"
                  name="brand"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Skriv brandet Ex. 'MBK'"
                />
              </div>

              {/* Color */}
              <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg en farve:</h2>

                <div className="grid grid-cols-2 place-items-center ">
                  <RadioButton
                    labelName={"Sort"}
                    name={"color"}
                    color={"radio border-neutral-900 bg-content"}
                    value="black"
                  />
                  <RadioButton
                    labelName={"Hvid"}
                    name={"color"}
                    color={"radio border-neutral-50 bg-content"}
                    value="white"
                  />
                  <RadioButton
                    labelName={"Grå"}
                    name={"color"}
                    color={"radio border-gray-400 bg-content"}
                    value="gray"
                  />
                  <RadioButton
                    labelName={"Rød"}
                    name={"color"}
                    color={"radio border-red-500 bg-content"}
                    value="red"
                  />
                  <RadioButton
                    labelName={"Blå"}
                    name={"color"}
                    color={"radio border-blue-700 bg-content"}
                    value="blue"
                  />
                  <RadioButton
                    labelName={"Grøn"}
                    name={"color"}
                    color={"radio border-green-700 bg-content"}
                    value="green"
                  />
                  <RadioButton
                    labelName={"Gul"}
                    name={"color"}
                    color={"radio border-yellow-400 bg-content"}
                    value="yellow"
                  />
                  <RadioButton
                    labelName={"Orange"}
                    name={"color"}
                    color={"radio border-orange-500 bg-content"}
                    value="orange"
                  />
                  <RadioButton
                    labelName={"Purple"}
                    name={"color"}
                    color={"radio border-purple-400 bg-content"}
                    value="purple"
                  />
                  <RadioButton
                    labelName={"Andet"}
                    name={"color"}
                    color={"radio radio-primary"}
                    value="other"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="py-8">
              {/* <DropZoneComponent></DropZoneComponent> */}
              <input type="file" id="files" name="images" multiple></input>
            </div>

            <button
              type="submit"
              value="submit"
              className="  flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
            >
              Registrer cykel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BikeRegistration;
