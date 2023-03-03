import React from "react";

export const VerifyByMessage = () => {
  return (
    <div class="m-auto flex w-64 justify-center space-y-0 rounded-2xl bg-white p-4 py-2 py-2 py-2 px-2 shadow-lg dark:bg-gray-800">
      <div class="px-30 py-30 py-30 w-ful h-full ">
        <p class=" mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Bekræft inden:
        </p>

        <div class="w-full">
          <div class=" relative ">
            <input
              type="text"
              id="search-form-location"
              class=" w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Verifikations kode"
            />
          </div>
        </div>
        <div className="py-2">
          <button
            type="button"
            class="w-full rounded-lg  bg-indigo-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
};
