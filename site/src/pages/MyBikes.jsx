import { MdPedalBike } from 'react-icons/md';
//import { BikeComponent } from '../components/MyBikes/BikeComponent';
import { IconContext } from 'react-icons';
import { motion } from "framer-motion";
import { useState } from 'react';
import { Footer } from '../components/Footers/footer';

const MineCykler = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen max-w">
            <div className="flex flex-col h-full items-center justify-center bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
                <motion.div
                    onClick={() => setIsOpen(!isOpen)}>
                    <button>
                        <IconContext.Provider value={{ color: "lightblue", size: '15em', className: "global-class-name" }}>
                            <div>
                                <MdPedalBike />
                            </div>
                        </IconContext.Provider>
                    </button>
                </motion.div>
                <div className="self-center justify-center text-xl font-light text-gray-800 sm:text-4xl dark:text-white">
                    Hej!
                </div>
                <div className="self-center justify-center text-l font-light text-gray-800 sm:text-3xl dark:text-white">
                    Vi kan se at du ikke har en cykel endnu
                    </div>
                <div className= "mx-auto text-l font-light text-gray-800 sm:text-3xl dark:text-white">
                    Indløs din første cykel ved at trykke på cyklen
                    </div>
                {isOpen && (
                    <motion.div>
                        <form action="#" className='p-6 mt-8'>
                            <div className='space-y-2'>
                                <label className="font-light text-gray-800 dark:text-white">
                                    Engangskode:
                                    <span className="text-red-500 required-dot"> *</span>
                                </label>
                                <input
                                    type="text"
                                    id="required-engangskode"
                                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="FrameNumber"
                                    placeholder="Indtast engangskode"
                                />
                            </div>
                            <button type="button" className="mt-8 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-orange-700 
                        focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center 
                        text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg " onClick={() => handleRedeemClick()}>
                                Indløs
                            </button>
                        </form>
                    </motion.div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default MineCykler