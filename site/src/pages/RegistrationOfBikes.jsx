import React from "react";
import RadioButton from "../components/register/Radiobutton";
import { Dropzone } from "../components/register/Dropzone";
import DropZoneComponent from "../components/register/DropzoneFunc";

const BikeRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 ">
      <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
        <div className="self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Cykel registering
        </div>

        <div className="p-6 mt-8">
          <form action="#">
            <div className=" space-y-2">
              <div className=" relative px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <label className="text-gray-700 ">
                  Stelnummer:
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  id="required-Stelnummer"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="FrameNumber"
                  placeholder="Indtast stelnummer på cyklen"
                />
              </div>
              <div className="px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <label
                  htmlFor="phone"
                  className="block font-medium text-gray-700"
                >
                  Phone number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1-123-456-7890"
                  pattern="[+][0-9]{1,3}-[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                ></input>
              </div>

              <div className="place-items-center grid grid-cols-3 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10  ">
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

              <div className="place-items-center grid grid-cols-2 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <RadioButton
                  labelName={"El-cykel"}
                  name={"electric"}
                  color={"radio radio-secondary"}
                />
                <RadioButton
                  labelName={"Ikke El-cykel"}
                  name={"electric"}
                  color={"radio radio-secondary"}
                />
              </div>

              <div className="place-items-center grid grid-cols-2 px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
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

              <div className="place-items-center grid grid-cols-2  py-8 bg-white rounded-lg shadow dark:bg-gray-800">
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

            <DropZoneComponent></DropZoneComponent>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BikeRegistration;
