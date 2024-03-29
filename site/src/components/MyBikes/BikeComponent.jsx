import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { IoReceiptOutline } from "react-icons/io5";
import { translateString } from "../../Helpers/TranslateStringEngToDk";

const API_URL = import.meta.env.VITE_API_URL;

export const BikeComponent = ({ data, mutate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportStolen = async () => {
    setIsSubmitting(true);

    await fetch(`${API_URL}/bikes/${data._id}/reportstolen`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + secureLocalStorage.getItem("accesstoken"),
      },
    });

    setIsSubmitting(false);
    // Trigger a mutate to refresh screen
    mutate(data);
  };

  return (
    <div className="mx-auto mb-4 flex max-w-[385px] rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
      <div className="flex flex-col justify-center">
        <motion.div
          transition={{ layout: { duration: 1, type: "spring" } }}
          layout="position"
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-gradient-to-r to-blue-500"
        >
          <img
            src={data ? data.image.obj_url : "no url"}
            alt="Bike"
            className={`${data.state === "in_transfer" ? "opacity-30" : "opacity-100"
              } "mx-auto h-[425px]" mt-8 mb-2 object-scale-down px-8`}
          />
        </motion.div>

        <div className="mt-2 mb-2 flex flex-col items-center justify-center text-sm">
          <p className="font-semibold text-white">
            Mærke: <span className="font-light text-white">{data.brand}</span>
          </p>
          <p className="font-semibold text-white">
            Stelnummer:{" "}
            <span className="font-light text-white">{data.frame_number}</span>
          </p>
        </div>

        {isOpen && (
          <div className="mb-4 flex flex-col">
            {/* Bike info */}

            <div className="flex flex-col items-center justify-center text-sm">
              <div className="flex justify-between space-x-4">
                <div className="flex w-full justify-between">
                  <p className="mr-1 font-semibold text-white">
                    Oprettelses dato:{" "}
                  </p>
                  <span className="font-light text-gray-300">
                    {new Date(data.created_at).toLocaleDateString('en-GB')}
                  </span>
                </div>
              </div>

              <div className=" flex flex-col items-center justify-center mt-1 text-sm">
                <div className="flex w-full justify-center">
                  <p className="font-semibold text-white">Model:</p>
                  <span className="ml-1 text-gray-300">
                    {" "}
                    {translateString(data.gender)}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center mt-1 text-sm">
                  <p className="font-semibold text-white">
                    Elektrisk:
                    <span className="ml-1 font-light text-gray-300">
                      {data.is_electric ? "Ja" : "Nej"}
                    </span>
                  </p>
                </div>

                <div className="m-1 flex w-full justify-evenly">
                  <p className="font-semibold text-white">
                    Slags:
                    <span className="font-light text-gray-300">
                      {" "}
                      {translateString(data.kind)}
                    </span>
                  </p>
                </div>

                <div className="mb-1 flex w-full justify-center">
                  <p className="mr-1 font-semibold text-white">Farve:</p>
                  <p className="font-light text-gray-300">
                    {translateString(data.color)}
                  </p>
                </div>
              </div>
              <p className="text-white font-semibold p-2">Hent kvittering:</p>
              <button
                onClick={() => (window.location.href = data.receipt.obj_url)}
              >
                <IoReceiptOutline className="mx-auto" color="white" size={32} />
              </button>
            </div>

            {/* Actions */}

            {/* Transfer */}
            {data.state === "transferable" && (
              <div className="mt-3 flex justify-evenly">
                <button
                  onClick={() => navigate(`/transferbike/${data._id}`)}
                  className="btn-info btn ml-2 hover:bg-blue-300"
                >
                  Overfør cykel
                </button>

                {data.reported_stolen ? (
                  <button
                    onClick={reportStolen}
                    className={`btn w-full max-w-[168px] ml-3 bg-orange-500 text-black hover:bg-orange-300 ${isSubmitting && 'loading'}`}
                  >
                    {!isSubmitting &&
                      <>
                        Rapporter fundet
                      </>
                    }
                  </button>
                ) : (
                  <button
                    onClick={reportStolen}
                    className={`btn w-full max-w-[153px] ml-4 bg-yellow-500 text-black hover:bg-yellow-300 ${isSubmitting && 'loading'}`}
                  >
                    {!isSubmitting &&
                      <>
                        Anmeld stjålet
                      </>
                    }
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
