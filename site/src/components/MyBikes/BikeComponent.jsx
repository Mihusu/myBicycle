import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StolenBike } from "./StolenBike";
import secureLocalStorage from "react-secure-storage";
import { IoReceiptOutline } from "react-icons/io5"

const API_URL = import.meta.env.VITE_API_URL;

export const BikeComponent = ({ data, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const reportStolen = async () => {
    await fetch(`${API_URL}/bikes/${data._id}/reportstolen`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + secureLocalStorage.getItem("accesstoken")
      },
    });

    // Trigger a mutate to refresh screen
    mutate(data);
  };

  return (
    <div
      className="mx-auto mb-4 max-w-[425px] flex rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="m-0 flex flex-col justify-center px-4 ">
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout="position"
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-gradient-to-r to-blue-500"
        >
          <img
            src={data ? data.image.obj_url : "no url"}
            alt="Bike"
            className={`${data.state === "in_transfer" ? 'opacity-30' : 'opacity-100'} "mx-auto mt-8 mb-2 object-scale-down w-[425px] h-[425px]" `}
          />
        </motion.div>

        <div className="flex flex-col items-center justify-center mt-2 mb-1 text-sm">
          <p className="font-semibold text-white">Model: </p>
          <p className="text-white">{data.brand}</p>
          <p className="font-semibold text-white">Stelnummer:</p>
          <p className="text-white">{data.frame_number}</p>
        </div>

        {isOpen && (
          <div className="flex flex-col mb-4">
            {/* Bike info */}

            <div className="flex flex-col items-center justify-center text-sm">
              <div className="flex justify-between space-x-4">
                <div className="flex w-full justify-between">
                  <p className="font-semibold text-white mr-1">Oprettelses dato: </p>
                  <span className="font-light text-white">{new Date(data.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className=" flex flex-col items-center justify-center py-1 text-sm">
                <div className="flex w-full justify-center">
                  <p className="font-semibold text-white">Køn:</p>
                  <span className="text-white ml-1"> {data.gender}</span>
                </div>

                <div className="flex flex-col items-center justify-center py-1 text-sm">
                  <p className="font-semibold text-white">Elektrisk:
                    <span className="font-light text-white ml-1">
                      {data.is_electric ? "Ja" : "Nej"}
                    </span>
                  </p>
                </div>

                <div className="flex w-full justify-evenly mb-1">
                  <p className="font-semibold text-white">Slags:
                    <span className="font-light text-white"> {data.kind}</span>
                  </p>
                </div>

                <div className="flex w-full justify-center mb-1">
                  <p className="font-semibold text-white mr-1">Farve:</p>
                  <p className="font-light text-white">{data.color}</p>
                </div>

                <div className="flex w-full justify-evenly mb-1">
                  <p className="font-semibold text-white mr-1">Mærke: </p>
                  <p className="text-white"> {data.brand}</p>
                </div>
              </div>
              <button onClick={() => window.location.href = data.receipt.obj_url}>
                <IoReceiptOutline className="mx-auto" color="white" size={32} />
              </button>
            </div>

            {/* Actions */}

            {/* Transfer */}
            {data.state === "transferable" && (
              <div className="flex justify-evenly mt-3">
                <button
                  onClick={() => navigate(`/transferbike/${data._id}`)}
                  className="btn btn-info hover:bg-blue-300"
                >
                  Overfør cykel
                </button>

                {data.reported_stolen ? (
                  <button
                    onClick={reportStolen}
                    className="btn bg-orange-500 hover:bg-orange-300 text-black"
                  >
                    Rapporter fundet
                  </button>
                ) : (
                  <button
                    onClick={reportStolen}
                    className="btn btn-warning hover:bg-yellow-300"
                  >
                    Anmeld stjålet
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
