import React from "react";
import RadioButton from "../components/register/Radiobutton";
import { PhoneNumber } from "../components/register/PhoneNumber";;

const BikeRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 ">
      <div className=" px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
        <div className="self-center text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Cykel registering
        </div>

        <div className="p-2 mt-4">
          <form
            method="post"
            action="http://127.0.0.1:8000/bikes"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <label className="px-4 mb-2">
                  Stelnummer:
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="text"
                  id="Stelnummer"
                  name="frame_number"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Indtast stelnummer"
                />
              </div>

              {/* Phonenumber */}
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 ">
                <h2 className="mb-2">
                  Indtast mobiloplysninger på den nye ejer:
                </h2>
                <div>
                  <PhoneNumber />
                </div>
              </div>

              {/* Bike model */}
              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg model:</h2>
                <div className="place-items-center grid grid-cols-3 px-4 py-2">
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
              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Er det en El-cykel?</h2>
                <div className="place-items-center grid grid-cols-2 px-4 py-2">
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
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg cykel type:</h2>
                <div className="place-items-center grid grid-cols-2 px-4 py-2">
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
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <label className="px-4 mb-2">Brand:</label>
                <input
                  type="text"
                  id="Brand"
                  name="brand"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Skriv brandet Ex. 'MBK'"
                />
              </div>

              {/* Color */}
              <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="mb-2">Vælg en farve:</h2>

                <div className="place-items-center grid grid-cols-2 ">
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
