import React from "react";

const BikeRegistration = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 w-1/3 md:w-auto">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Cykel registering
        </div>

        <div className="p-6 mt-8">
          <form action="#">
            <div className=" relative ">
              <label className="text-gray-700">
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
            <div>
              <label for="phone" className="block font-medium text-gray-700">
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
            <div className="justify-between flex flex-row">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Male</span>
                  <input
                    type="radio"
                    name="opt"
                    checked="checked"
                    class="radio"
                    value=""
                  ></input>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Female</span>
                  <input
                    type="radio"
                    name="opt"
                    checked="checked"
                    class="radio radio-primary"
                    value=""
                  ></input>
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Unisex</span>
                  <input
                    type="radio"
                    name="opt"
                    checked="checked"
                    class="radio radio-secondary"
                    value=""
                  ></input>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BikeRegistration;
