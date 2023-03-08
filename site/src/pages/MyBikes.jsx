import { MdPedalBike } from "react-icons/md";
//import { BikeComponent } from '../components/MyBikes/BikeComponent';
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Footer } from "../components/Footers/footer";
import secureLocalStorage from "react-secure-storage";

const MineCykler = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const accessToken = secureLocalStorage.getItem("accesstoken");
    console.log(accessToken);
  },[]);

  return (
    <div className="max-w flex h-screen flex-col">
      <div className="flex h-full flex-col items-center justify-center rounded-lg bg-white shadow dark:bg-gray-800 sm:px-6 md:w-auto md:px-8 lg:px-10">
        <motion.div onClick={() => setIsOpen(!isOpen)}>
          <button>
            <IconContext.Provider
              value={{
                color: "lightblue",
                size: "15em",
                className: "global-class-name",
              }}
            >
              <div>
                <MdPedalBike />
              </div>
            </IconContext.Provider>
          </button>
        </motion.div>
        <div className="justify-center self-center text-xl font-light text-gray-800 dark:text-white sm:text-4xl">
          Hej!
        </div>
        <div className="text-l justify-center self-center font-light text-gray-800 dark:text-white sm:text-3xl">
          Vi kan se at du ikke har en cykel endnu
        </div>
        <div className="text-l mx-auto font-light text-gray-800 dark:text-white sm:text-3xl">
          Indløs din første cykel ved at trykke på cyklen
        </div>
        {isOpen && (
          <motion.div>
            <form action="#" className="mt-8 p-6">
              <div className="space-y-2">
                <label className="font-light text-gray-800 dark:text-white">
                  Engangskode:
                  <span className="required-dot text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="required-engangskode"
                  className="w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  name="FrameNumber"
                  placeholder="Indtast engangskode"
                />
              </div>
              <button
                type="button"
                className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-600 py-2 
                        px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 
                        ease-in hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200 "
                onClick={() => handleRedeemClick()}
              >
                Indløs
              </button>
            </form>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MineCykler;
