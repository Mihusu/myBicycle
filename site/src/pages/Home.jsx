import React from "react";
import StoreLogin from "../BikeStore/pages/StoreLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Home = () => {
  //

  const navigate = useNavigate();

  return (
    <div className="h-screen">
      <div className="flex h-1/4 flex-col items-center justify-center">
        <h1 className="py-2 text-3xl text-white">{"Velkommen til MinCykel"}</h1>
        <h2 className="text-xl text-white">
          {"Vælg hvordan du vil logge ind"}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mx-auto max-w-[450px]">
        <button
          type="button"
          className="mb-8 flex w-2/3 items-center justify-center rounded-lg  bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  focus:ring-offset-red-200 "
        >
          Myndighed
        </button>

        <Link to="/bikeregistration" className="mb-8 flex w-2/3 items-center justify-center rounded-lg  bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  focus:ring-offset-red-200">
          <button type="button">
            Butik
          </button>
        </Link>

        <button
          onClick={() => navigate("/login")}
          type="button"
          className="mb-8 flex w-2/3 items-center justify-center rounded-lg  bg-red-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2  focus:ring-offset-red-200 "
        >
          Bruger
        </button>
      </div>
    </div>
  );
};

export default Home;
