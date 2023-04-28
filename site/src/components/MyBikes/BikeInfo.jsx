import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

// Basic bike info component without actionable buttons, used for bike lookup page
export const BikeInfo = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prototype translate text function
  // Could be expanded to handle all text coming from backend
  function translateString(string) {
    const dict = { male: "Herre", female: "Dame", child: "Barn" };
    if (dict[string]) {
      return dict[string];
    } else {
      return "Unknown";
    }
  }

  return (
    <div className="flex w-full mx-auto max-w-[425px] rounded-lg border bg-gray-800 shadow-lg hover:shadow-xl dark:bg-gray-800 md:w-1/2">
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
            className={
            "mx-auto sm:px-2 md:px-4 lg:px-6 max-h-[425px] max-w-[375px] py-4 "}
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

            <div className="flex flex-col items-center justify-center py-1 text-sm">
              <div className="flex justify-between space-x-4">
                <div className="flex w-full justify-between">
                  <p className="mr-1     font-semibold text-white">
                    Oprettelses dato:
                  </p>
                  <span className="font-light text-white">
                    {new Date(data.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className=" flex flex-col items-center justify-center py-1 text-sm">
                <div className="flex w-full justify-center">
                  <p className="font-semibold text-white">
                    Model:
                    <span className="ml-1 font-light text-white">
                      {translateString(data.gender)}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center py-1 text-sm">
                  <p className="font-semibold text-white">
                    Elektrisk:
                    <span className="ml-1 font-light text-white">
                      {data.is_electric ? "Ja" : "Nej"}
                    </span>
                  </p>
                </div>

                <div className="flex w-full justify-evenly py-1">
                  <p className="font-semibold text-white">
                    Slags:
                    <span className="font-light text-white"> {data.kind}</span>
                  </p>
                </div>

                <div className="flex w-full justify-evenly py-1">
                  <p className="font-semibold text-white">
                    Farve:
                    <span className="font-light text-white"> {data.color}</span>
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
