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
                <label className="mb-2">
                  Stelnummer:
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                  <input
                    type="text"
                    id="Stelnummer"
                    class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                    color={" radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Dame"}
                    name={"gender"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Unisex"}
                    name={"gender"}
                    color={"radio radio-primary"}
                  />
                </div>
              </div>

              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Er det en El-cykel?</h2>
                <div className="whitespace-nowrap place-items-center grid grid-cols-2 px-4 py-2">
                  <RadioButton
                    labelName={"El-cykel"}
                    name={"electric"}
                    color={"radio radio-secondary"}
                  />
                  <RadioButton
                    labelName={"Ikke El-cykel"}
                    name={"electric"}
                    color={"radio  border border-blue-400 mr-2"}
                  />
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg cykel type:</h2>
                <div className="place-items-center grid grid-cols-2 px-4 py-2">
                  <RadioButton
                    labelName={"City"}
                    name={"bike-type"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Gravel"}
                    name={"bike-type"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Lad"}
                    name={"bike-type"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Racer"}
                    name={"bike-type"}
                    color={"radio radio-primary"}
                  />
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg en farve:</h2>

                <div className="place-items-center grid grid-cols-2 ">
                  <RadioButton
                    labelName={"Sort"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Hvid"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Grå"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Rød"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Blå"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Grøn"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Gul"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Orange"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
                  />
                  <RadioButton
                    labelName={"Lilla"}
                    name={"bike-color"}
                    color={"radio radio-primary"}
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
