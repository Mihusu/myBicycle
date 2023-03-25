import React from "react";
import secureLocalStorage from "react-secure-storage";
import { IoIosArrowForward } from "react-icons/io"
import { IconContext } from "react-icons";

const API_URL = import.meta.env.VITE_API_URL

export const OldBikeRequest = ({ data }) => {

    // const get_bike_request_detail = (API_URL + `/transfers/detail`)

    // const token = secureLocalStorage.getItem('accesstoken')

    // async function getBikeRequest() {

    //     const response = await fetch(get_bike_request_detail, {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + token,
    //         },
    //     })

    //     const res = await response.json()
    //     console.log(res)
    // }

    return (
        <div className="flex justify-center mb-2 bg-white rounded-lg mx-auto shadow dark:bg-gray-800 dark:text-white sm:px-3 md:px-8 lg:px-10 py-4" style={{ maxWidth: "425px" }}>
            {/* Old bike requests */}
            <Link to={'/activities/detail'}>
            <button className="flex flex-col">
                <h1 className="mb-2 text-xl">
                    <div className="text-xl mr-32">Mobilnummer: {data.tlf} </div>
                    <div className="flex items-center justify-center">
                        <img src="image-url" alt="alt-text" className="inline-block h-4 w-4 mr-3 text-sm" />
                        <span className="text-sm ml-2 mr-8">Du anmoder om overførsel af en cykel</span>
                        <IconContext.Provider value={{ className: "mx-auto", color: "white", size: 25 }}>
                            <>
                                <IoIosArrowForward />
                            </>
                        </IconContext.Provider>
                    </div>
                </h1>
                <span className="text-xs ml-9">Dato: {new Date(data.closed_at).toLocaleDateString()}</span>
            </button>
            </Link>
        </div>
    );
};