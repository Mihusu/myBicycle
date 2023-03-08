import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

export const BikeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // {App}
    <div className="m-0 p-0 box-border display: flex justify-center ">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r dark:bg-gray-800 to-blue-500 rounded-lg p-4"
      >
        <img
          src="../src/assets/bicycle-svgrepo.svg"
          alt="Bike"
          className="mx-auto py-4"
        />
        <motion.div layout="position" className="">
          <div className="flex flex-col justify-center py-2 text-sm">
            <p className="font-light text-gray-800 dark:text-white">Model:</p>
            <p className="font-light text-gray-800 dark:text-white">Stelnummer:</p>
          </div>
        </motion.div>

        {isOpen && (
          <motion.div className="">
            <div className="flex flex-col justify-center py-2 text-sm">
              <p className="font-light text-gray-800 dark:text-white">Type:</p>
              <p className="font-light text-gray-800 dark:text-white">Farve:</p>
            </div>

            <div className="flex justify-between py-6">
              <button className="btn btn-accent">Overfør</button>
              <button className="btn btn-warning"> Meld Stjålet</button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// h-40
