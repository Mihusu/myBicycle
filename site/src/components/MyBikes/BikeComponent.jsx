import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StolenBike } from "./StolenBike";

const API_URL = import.meta.env.VITE_API_URL;

export const BikeComponent = ({ data, mutate }) => {

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const reportStolen = async () => {
    await fetch(`${API_URL}/bikes/${id}/reportstolen`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    })

    // Trigger a mutate to refresh screen
    mutate(data)

  }

  return (
    <div className={`${data.state === "in_transfer" ? 'opacity-30' : 'opacity-100'}`}>
      <div className="flex border rounded-lg bg-white shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 mb-4 mx-auto" style={{ maxWidth: "425px" }}>
        <div className="flex flex-col justify-center px-4 m-0 ">
          <motion.div
            transition={{ layout: { duration: 1, type: "spring" } }}
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col space-y-2 cursor-pointer rounded-lg bg-gradient-to-r to-blue-500"
          >
            <img
              src={data.image.obj_url}
              alt="Bike"
              className="mx-auto py-4 object-scale-down w-[480px] h-[480px]"
            />
          </motion.div>

          <div className="flex flex-col justify-center items-center py-2 text-sm">
            <p className="font-light text-gray-800 dark:text-white">Model: {data.brand}</p>
            <p className="font-light text-gray-800 dark:text-white">Stelnummer: {data.frame_number}</p>
          </div>

          {isOpen && (
            <div className="flex flex-col space-y-4">
              {/* Bike info */}

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between space-x-4">
                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Oprettelses dato:</p>
                    <p className="font-light text-gray-800 dark:text-white">{new Date(data.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Stelnummer:</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.frame_number}</p>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Køn:</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.gender}</p>
                  </div>

                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Er elektrisk?</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.is_electric ? 'Ja' : 'Nej'}</p>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Slags:</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.kind}</p>
                  </div>

                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Farve:</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.color}</p>
                  </div>
                </div>

                <div className="flex justify-between space-x-4">
                  <div className="flex justify-between w-full">
                    <p className="font-light text-gray-800 dark:text-white">Brand:</p>
                    <p className="font-light text-gray-800 dark:text-white">{data.brand}</p>
                  </div>

                  <div className="flex justify-between w-full">
                    <p />
                    <p />
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-between py-5 ">

                {/* Transfer */}
                <button
                  onClick={() => navigate(`/transferbike/${data._id}`)}
                  disabled={!(data.state == "transferable")}
                  className="btn-info btn"
                >
                  Overfør
                </button>

                {/* Report stolen */}
                {data.reported_stolen ?
                  <button 
                    disabled={!(data.state == "transferable")} 
                    onClick={reportStolen}
                    className="btn btn-info"
                  >
                    Rapporter fundet
                  </button>
                  :
                  <button 
                    disabled={!(data.state == "transferable")} 
                    onClick={reportStolen}
                    className="btn btn-warning"
                  >
                    Rapporter stjålet
                  </button>
                }

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
