import React, { useEffect } from "react";
import { Footer } from "../components/Layout/Footer";
import { Layout } from "../components/Layout/Layout";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";

export const BikeReportFound = () => {
  return (
    <LayoutWithBack title="Indrapporter cykel">
      <div className="flex flex-col items-center justify-center bg-purple-100">
        <div className="mt-8 p-6">
          <form action="#">
            <div className="mb-2 flex flex-col">
              <div className=" relative ">
                <h1>Angiv adresse</h1>
                <input
                  type="text"
                  id="create-account-pseudo"
                  className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name="pseudo"
                  placeholder="Gadenavn"
                />
              </div>
            </div>

            <label className="text-gray-700" htmlFor="name">
              <textarea
                className="w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                id="comment"
                placeholder="Skriv evt. dine kontankt oplysninger"
                name="comment"
                rows="5"
                cols="40"
              ></textarea>
            </label>

            <div className="my-4 flex w-full">
              <button
                type="submit"
                className="w-full rounded-lg  bg-purple-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  focus:ring-offset-purple-200 "
              >
                Send
              </button>
            </div>
          </form>
        </div>
        {/* <Footer /> */}
      </div>
    </LayoutWithBack>
  );
};
