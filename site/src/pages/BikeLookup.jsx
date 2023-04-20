import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Layout/Footer";
import { BikeInfo } from "../components/MyBikes/BikeInfo";
import secureLocalStorage from "react-secure-storage";
import { Layout } from "../components/Layout/Layout";

export const BikeLookup = () => {
  const navigate = useNavigate();
  const [bikeFound, setBikeFound] = useState(false);
  const [frameNumber, setFrameNumber] = useState("");
  const [error, setError] = useState(null);
  const [bikeData, setBikeData] = useState(null);
  const [isStolen, setIsStolen] = useState(false);

  const token = secureLocalStorage.getItem("accesstoken");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL + `/bikes/${frameNumber}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setBikeFound(true);
        setBikeData(result);
        setIsStolen(result.reported_stolen);
        setError(null);
      } else {
        setBikeFound(false);
        setBikeData(null);
        setError(response.statusText);
        console.error(response.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("hello from useEffect()");
  }, [bikeFound, bikeData]);

  return (
    <Layout title="Søg efter cykel">
        {error && (
          <div className="mb-2 rounded-lg bg-red-500 px-2 py-2 text-black">
            {error}
          </div>
        )}
        {/* Search for bike input field */}
        <form onSubmit={handleSubmit} className="mx-2 my-2 w-full md:w-1/2">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Søg på stelnummer om cykel er meldt stjålet
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Søg på stelnummer"
              onChange={(e) => setFrameNumber(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Søg
            </button>
          </div>
        </form>

        {/* Bike information */}
        {bikeData && <BikeInfo data={bikeData} />}

        {/* Report found button */}
        {/* Can also be redered conditionally on isStolen instead of bikeFound */}
        {bikeFound && (
          <div className="flex justify-center w-full">
          <button
            type="button"
            onClick={() => navigate(`/bikereportfound/${bikeData.frameNumber}`)}
            className="flex w-fit mx-2 my-2 py-2 px-4 rounded-lg bg-blue-600 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200  disabled:opacity-25"
            disabled={!isStolen}
          >
            Indrapporter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
          </div>
        )}
    </Layout>
  );
};