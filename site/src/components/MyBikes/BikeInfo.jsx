import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { translateString } from "../../Helpers/TranslateStringEngToDk";

// Basic bike info component without actionable buttons, used for bike lookup page
export const BikeInfo = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex mx-auto rounded-lg max-w-[385px] border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout="position"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer flex-col space-y-2 rounded-lg bg-gradient-to-blue-500"
      >
        <div className="flex flex-col justify-center m-4">
          <img
            src={data.image.obj_url}
            alt="Bike"
            className={`"mx-auto h-[425px]" mt-4 mb-2 object-scale-down px-8`}
          />


          <div className="flex flex-col items-center justify-center py-2 text-sm">
            <p className="font-semibold text-white">
              Mærke: <span className="font-light text-white">{data.brand}</span>
            </p>
            <p className="font-semibold text-white">
              Stelnummer:{" "}
              <span className="font-light text-white">{data.frame_number}</span>
            </p>
          </div>

          {isOpen && (
            <div className="flex flex-col">
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
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
