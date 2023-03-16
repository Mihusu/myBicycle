import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BikeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const navigateToTransferBike = () => {
    // 👇️ navigate to /contacts
    navigate("/transferbike");
  };

  const navigateToStolenBike = () => {
    // 👇️ navigate to /
    navigate("/stolenbike");
  };

  return (
    <div className="m-0 box-border flex flex-col justify-center px-4 ">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        layout
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col space-y-2 rounded-lg bg-gradient-to-r to-blue-500 dark:bg-gray-800"
      >
        <img
          src="../src/assets/bicycle-svgrepo.svg"
          alt="Bike"
          className="mx-auto py-4"
        />
      </motion.div>

      <div className="flex flex-col justify-center py-2 text-sm">
        <p className="font-light text-gray-800 dark:text-white">Model:</p>
        <p className="font-light text-gray-800 dark:text-white">Stelnummer:</p>
      </div>

      {isOpen && (
        <div className="flex flex-col space-y-4">
          {/* Bike info */}
          <div className="flex flex-col justify-center py-2 text-sm">
            <p className="font-light text-gray-800 dark:text-white">Type:</p>
            <p className="font-light text-gray-800 dark:text-white">Farve:</p>
          </div>

          {/* Actions */}
          <div className="flex flex justify-between py-5 ">
            <button onClick={navigateToTransferBike} className="btn-accent btn">
              Overfør
            </button>
            <button onClick={navigateToStolenBike} className="btn-warning btn">
              Meld Stjålet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
