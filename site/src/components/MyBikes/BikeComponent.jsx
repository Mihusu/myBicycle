import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const BikeComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // {App}
    <div className="m-0 p-0 box-border display: flex justify-center ">
      <motion.div
        transition={{ layout: { duration: 1, type: "spring" } }}
        Layout
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-4"
      >
        <img
          src="../src/assets/bicycle-svgrepo.svg"
          alt="Bike"
          className="mx-auto"
        />
        <motion Layout="position" className="">
          <div className="flex flex-col justify-center py-2 text-sm">
            <p>Model:</p>
            <p>Stelnummer:</p>
          </div>
        </motion>

        {isOpen && (
          <motion.div className="">
            <div className="flex flex-col justify-center py-2 text-sm">
              <p>Type:</p>
              <p>Farve:</p>
            </div>

            <div className="flex justify-between py-10 ">
              <button className="btn btn-accent">Overfør</button>
              <button className="btn btn-warning"> Meld Stjålet</button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BikeComponent;
// h-40
