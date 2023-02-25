import React from "react";
import RadioButton from "../components/register/Radiobutton";
import DropZoneComponent from "../components/register/DropzoneFunc";
import PhoneNumber from "../components/register/Phonenumber";

const BikeRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 ">
      <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
        <div className="self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Cykel registering
        </div>

        <div className="p-2 mt-4">
          <form action="#">
            <div className="space-y-2">
              <div>
                <label className="px-4 mb-2">
                  Stelnummer:
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                  <input
                    type="text"
                    id="Stelnummer"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Indtast stelnummer"
                  />
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 ">
                <h2 className="mb-2">
                  Indtast mobiloplysninger på den nye ejer:
                </h2>
                <div>
                  <PhoneNumber></PhoneNumber>
                </div>
              </div>

              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg model:</h2>
                <div className="place-items-center grid grid-cols-3 px-4 py-2">
                  <RadioButton
                    labelName={"Herre"}
                    name={"gender"}
                    color={" radio border-blue-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Dame"}
                    name={"gender"}
                    color={"radio border-pink-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Unisex"}
                    name={"gender"}
                    color={"radio border-purple-500 bg-content"}
                  />
                </div>
              </div>

              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Er det en El-cykel?</h2>
                <div className="place-items-center grid grid-cols-2 px-4 py-2">
                  <RadioButton
                    labelName={"El-cykel"}
                    name={"electric"}
                    color={"radio border-green-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Ikke El-cykel"}
                    name={"electric"}
                    color={"radio border-yellow-900 bg-content"}
                  />
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg cykel type:</h2>
                <div className="place-items-center grid grid-cols-2 px-4 py-2">
                  <RadioButton
                    labelName={"City"}
                    name={"bike-type"}
                    color={"radio border-teal-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Gravel"}
                    name={"bike-type"}
                    color={"radio border-indigo-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Lad"}
                    name={"bike-type"}
                    color={"radio border-yellow-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Racer"}
                    name={"bike-type"}
                    color={"radio border-red-500 bg-content"}
                  />
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg en farve:</h2>

                <div className="place-items-center grid grid-cols-2 ">
                  <RadioButton
                    labelName={"Sort"}
                    name={"bike-color"}
                    color={"radio border-neutral-900 bg-content"}
                  />
                  <RadioButton
                    labelName={"Hvid"}
                    name={"bike-color"}
                    color={"radio border-neutral-50 bg-content"}
                  />
                  <RadioButton
                    labelName={"Grå"}
                    name={"bike-color"}
                    color={"radio border-gray-400 bg-content"}
                  />
                  <RadioButton
                    labelName={"Rød"}
                    name={"bike-color"}
                    color={"radio border-red-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Blå"}
                    name={"bike-color"}
                    color={"radio border-blue-700 bg-content"}
                  />
                  <RadioButton
                    labelName={"Grøn"}
                    name={"bike-color"}
                    color={"radio border-green-700 bg-content"}
                  />
                  <RadioButton
                    labelName={"Gul"}
                    name={"bike-color"}
                    color={"radio border-yellow-400 bg-content"}
                  />
                  <RadioButton
                    labelName={"Orange"}
                    name={"bike-color"}
                    color={"radio border-orange-500 bg-content"}
                  />
                  <RadioButton
                    labelName={"Pink"}
                    name={"bike-color"}
                    color={"radio border-pink-400 bg-content"}
                  />
                  <RadioButton
                    labelName={"Andet"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                </div>
              </div>
            </div>
            <div className="py-8">
              <DropZoneComponent></DropZoneComponent>
            </div>
            <button
              type="button"
              className="  py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
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
