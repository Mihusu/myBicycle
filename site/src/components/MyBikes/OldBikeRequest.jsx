import React from "react";
import { IoIosArrowForward } from "react-icons/io"
import { IconContext } from "react-icons";

export const OldBikeRequest = () => {

    return (
        <div className="flex justify-center mt-8 bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            {/* Old bike requests */}
            <div className="text-2xl">
                Gennemførte overførelser
                <button className="flex flex-col">
                    <h1 className="mb-2 mt-8 text-xl">
                        <div className="text-xl mr-36">Name fetch</div>
                        <div className="flex items-center justify-center">
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-3 text-sm" />
                            <span className="text-sm ml-2 mr-6">Du anmoder om overførsel af en cykel</span>
                            <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 25 }}>
                                <>
                                    <IoIosArrowForward />
                                </>
                            </IconContext.Provider>
                        </div>
                        <div className="text-xs mr-48">Dato fetch</div>
                    </h1>

                    <h1 className="mb-2 mt-8 text-xl">
                        <div className="text-xl ml-4">Name fetch</div>
                        <div className="flex items-center justify-center">
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-3 text-sm" />
                            <span className="text-sm ml-2">Du modtog en cykel</span>
                            <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 25 }}>
                                <>
                                    <IoIosArrowForward />
                                </>
                            </IconContext.Provider>
                        </div>
                        <div className="text-xs mr-8">Dato fetch</div>
                    </h1>

                    <h1 className="mb-2 mt-8 text-xl">
                        <div className="text-xl">Name fetch</div>
                        <div className="flex items-center justify-center">
                            <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-3 text-sm" />
                            <span className="text-sm">Du overførte en cykel</span>
                            <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 25 }}>
                                <>
                                    <IoIosArrowForward />
                                </>
                            </IconContext.Provider>
                        </div>
                        <div className="text-xs">Dato fetch</div>
                    </h1>
                </button>
            </div>
        </div>
    );
};