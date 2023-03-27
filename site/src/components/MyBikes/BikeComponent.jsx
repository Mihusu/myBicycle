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
    });

    // Trigger a mutate to refresh screen
    mutate(data);
  };

  return (
    <div
      className="mx-auto mb-4 flex rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
      style={{ maxWidth: "425px" }}
    >
      <div className="m-0 flex flex-col justify-center px-4 ">
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout="position"
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-gradient-to-r to-blue-500"
        >
          <img
            src={data.image.obj_url}
            alt="Bike"
            className={`${data.state === "in_transfer" ? 'opacity-30' : 'opacity-100'} "mx-auto py-10 object-scale-down w-[425px] h-[425px]" `}
          />
        </motion.div>

        <div className="flex flex-col items-center justify-center py-2 text-sm">
          <p className="font-semibold text-white">Model: </p>
          <p className="text-white">{data.brand}</p>
          <p className="font-semibold text-white">Stelnummer:</p>
          <p className="text-white">{data.frame_number}</p>
        </div>

        {isOpen && (
          <div className="flex flex-col">
            {/* Bike info */}

            <div className="flex flex-col items-center justify-center py-2 text-sm">
              <div className="flex justify-between space-x-4">
                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white">Oprettelses dato:</p>
                  <p className="text-white">
                    {new Date(data.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className=" flex flex-col items-center justify-center py-2 text-sm">
                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white">Køn:</p>
                  <p className="text-white">{data.gender}</p>
                </div>

                <div className="flex flex-col items-center justify-center py-2 text-sm">
                  <p className="font-semibold text-white">Elektrisk:</p>
                  <p className="font-light text-white">
                    {data.is_electric ? "Ja" : "Nej"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-2 text-sm">
                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white">Slags:</p>
                  <p className="font-light text-white">{data.kind}</p>
                </div>

                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white">Farve:</p>
                  <p className="font-light text-white">{data.color}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-2 text-sm">
                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white">Mærke:</p>
                  <p className="text-white">{data.brand}</p>
                </div>

                <div className="flex w-full justify-between">
                  <p />
                  <p />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-evenly py-3">
              {/* Transfer */}
              {data.state === "transferable" && (
                <div>
                  <button
                    onClick={() => navigate(`/transferbike/${data._id}`)}
                    className="btn-info btn"
                  >
                    Overfør cykel
                  </button>

                  {data.reported_stolen ? (
                    <button
                      onClick={reportStolen}
                      className="btn-info btn"
                    >
                      Rapporter fundet
                    </button>
                  ) : (
                    <button
                      onClick={reportStolen}
                      className="btn-warning btn"
                    >
                      Rapporter stjålet
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
