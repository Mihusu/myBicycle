
import { MdPedalBike } from 'react-icons/md';
import { TbActivityHeartbeat } from 'react-icons/tb'
import { BikeComponent } from '../components/BikeComponent';
import { IconContext } from 'react-icons';
import { motion } from "framer-motion";
import { useState } from 'react';
import { Footer } from '../components/Footers/footer';

const MineCykler = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen max-w">
            <div className="flex flex-col h-full items-center justify-center px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
                <motion.div
                    onClick={() => setIsOpen(!isOpen)}>
                    <button>
                        <IconContext.Provider value={{ color: "lightblue", size: "16em", className: "global-class-name" }}>
                            <div>
                                <MdPedalBike />
                            </div>
                        </IconContext.Provider>
                    </button>
                </motion.div>
                <div className="self-center justify-center text-xl font-light text-gray-800 sm:text-4xl dark:text-white">
                    Hej!
                </div>
                <div className="self-center justify-center text-xl font-light text-gray-800 sm:text-3xl dark:text-white">
                    Vi kan se at du ikke har en cykel endnu
                    </div>
                <div className= "self-center justify-center text-xl font-light text-gray-800 sm:text-3xl dark:text-white">
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
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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




/*
        
<div className="flex flex-col h-screen max-w">
    <div className="flex flex-col h-full items-center justify-center px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 md:w-auto">
        <button>
            <IconContext.Provider value={{ color: "lightblue", size: "16em", className: "global-class-name" }}>
                <div>
                    <MdPedalBike />
                </div>
            </IconContext.Provider>
        </button>
        <div className="self-center justify-center text-xl font-light text-gray-800 sm:text-4xl dark:text-white">
            Indløs din første cykel
        </div>
        <form action="#" className='p-6 mt-8'>
            <div className='space-y-2'>
                <label className="font-light text-gray-800 dark:text-white">
                    Engangskode:
                    <span className="text-red-500 required-dot"> *</span>
                </label>
                <input
                    type="text"
                    id="required-engangskode"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
        <div className="flex flex-col mt-auto">
            <div className="btm-nav-lg">
                <button className="text-info px-12 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="lightgreen"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </button>
                <button className="text-info active px-12 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="blue"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button className="text-info px-12 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="orange" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>
*/



