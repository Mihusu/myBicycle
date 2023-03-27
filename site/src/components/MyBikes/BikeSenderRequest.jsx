import React from "react";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export const BikeSenderRequest = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  async function retractBikeRequest() {
    const retract_bike_request =
      API_URL + `/transfers/${data.transfer_id}/retract`;

    const token = secureLocalStorage.getItem("accesstoken");

    const response = await fetch(retract_bike_request, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const res = await response.json();
    console.log(res);
  }

  return (
    <div
      className="mx-auto mt-6 flex  justify-center rounded-lg bg-gray-800 py-4 shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10"
      style={{ maxWidth: "425px" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-gradient-to-r to-blue-500"
        >
          <div className="mr-8 p-2 text-2xl text-white">
            Anmodning
            <div className="space-y-2 py-2">
              <h1 className="mb-2">
                <div className="ml-10 text-lg text-white">
                  Mobilnummer: {data.receiver.phone_number}{" "}
                </div>
                <img
                  src="image-url"
                  alt="alt-text"
                  className="mr-4 inline-block h-4 w-4 text-sm"
                />
                <span className="white-text ml-2 text-sm text-white">
                  Du anmoder om overførsel af en cykel
                </span>
                <div className="ml-10 text-xs text-white">
                  Dato: {new Date(data.created_at).toLocaleDateString()}{" "}
                </div>
              </h1>
            </div>
          </div>
        </motion.div>

        {isOpen && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="btn flex w-40 max-w-xs justify-center bg-red-500 text-green-100 "
              type="submit"
              onClick={() => retractBikeRequest()}
              style={{ marginRight: "0.2px" }}
            >
              Fortryd
            </button>
            <Link to={`/transfers/detail/${data.transfer_id}`}>
              <button
                className="btn flex w-40 max-w-xs justify-center bg-green-500 text-green-100"
                type="button"
                style={{ marginLeft: "0.2px" }}
              >
                Åben
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
