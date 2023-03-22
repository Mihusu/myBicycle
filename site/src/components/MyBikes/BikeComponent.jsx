import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export const BikeComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center px-4 m-0 box-border border border-white rounded-md">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col space-y-2 cursor-pointer rounded-lg bg-gradient-to-r to-blue-500 dark:bg-gray-800"
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
          <h2 className="text-white pb-2 border-b border-white">Cykel info:</h2>

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

            <Link to="/transferbike">
              <button className="btn-info btn">
                Overfør
              </button>
            </Link>

            <Link to="/stolenbike">
              <button className="btn-error btn">
                Meld Stjålet
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};
