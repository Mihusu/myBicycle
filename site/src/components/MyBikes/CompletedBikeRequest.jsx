import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io"
import { IconContext } from "react-icons";

export const CompletedBikeRequest = ({ data }) => {

    return (
        <div className="flex justify-center mb-2 bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            {/* Old bike requests */}
            <Link to={`/transfers/detail/${data.transfer_id}`}>
            <button className="flex flex-col">
                <h1 className="mb-2 text-xl">
                    <div className="text-lg mr-3">Mobilnummer: {data.receiver.phone_number} </div>
                    <div className="flex items-center justify-center">
                        <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-3 text-sm" />
                        <span className="text-sm ml-2 mr-5">Du anmoder om overførsel af en cykel</span>
                        <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 25 }}>
                            <>
                                <IoIosArrowForward />
                            </>
                        </IconContext.Provider>
                    </div>
                    <div className="text-xs mr-40">Dato: {new Date(data.closed_at).toLocaleDateString()}</div>
                </h1>
            </button>
            </Link>
        </div>
    );
};